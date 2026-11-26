"""Editable, camera-matched furniture, devices and accessories for Andrew's desk.

Screen coordinates below are measurements on the 1672 by 941 desk study.
The builder converts them to metric world coordinates. Curved objects carry
their full cross section, including shell thickness, rims and recessed faces.
"""
import math
import random

import bpy
from mathutils import Vector


def build(b):
    rng = random.Random(152)
    point = b.point

    def plate(name, outline, d, thickness, bevel=0):
        n = len(outline)
        front = [point(x, y, d) for x, y in outline]
        center = tuple(sum(axis) / n for axis in zip(*outline))
        offset = point(*center, d + thickness) - point(*center, d)
        verts = front + [p + offset for p in front]
        faces = [tuple(reversed(range(n))), tuple(range(n, 2 * n))]
        faces += [(i, (i + 1) % n, n + (i + 1) % n, n + i) for i in range(n)]
        return b.mesh(name, verts, faces, bevel)

    def rounded(name, rect, d, thickness, radius, bevel=.002):
        x0, y0, x1, y1 = rect
        r = min(radius, (x1 - x0) / 2, (y1 - y0) / 2)
        outline = []
        for x, y, start in [(x1-r, y0+r, -90), (x1-r, y1-r, 0),
                            (x0+r, y1-r, 90), (x0+r, y0+r, 180)]:
            for k in range(7):
                a = math.radians(start + 15*k)
                outline.append((x+r*math.cos(a), y+r*math.sin(a)))
        return plate(name, outline, d, thickness, bevel)

    def finish_rings(name, rings, smooth=True):
        count = len(rings[0])
        verts = [v for ring in rings for v in ring]
        faces = [tuple(range(count - 1, -1, -1))]
        for j in range(len(rings) - 1):
            k = j * count
            for i in range(count):
                h = (i + 1) % count
                faces.append((k+i, k+h, k+count+h, k+count+i))
        faces.append(tuple(range(len(verts)-count, len(verts))))
        obj = b.mesh(name, verts, faces)
        if smooth and obj is not None:
            for p in obj.data.polygons:
                p.use_smooth = len(p.vertices) == 4
        return obj

    def lathe(name, x, d, profile, segments=48):
        """Turn a profile around a vertical axis; include interior contours when hollow."""
        rings = []
        for v, rx, ry, dz in profile:
            ring = []
            for i in range(segments):
                a = math.tau * i / segments
                ring.append(point(x + rx*math.cos(a), v + ry*math.sin(a), d-dz*math.sin(a)))
            rings.append(ring)
        return finish_rings(name, rings)

    def conduit(name, path, radius, sides=10):
        """Smoothly bend tubing along measured control points."""
        pos = [point(*p) for p in path]
        centers = []
        for i in range(len(pos) - 1):
            a = pos[max(0, i-1)]
            c, e = pos[i:i+2]
            f = pos[min(i+2, len(pos)-1)]
            for j in range(5):
                t = j / 5
                centers.append(.5 * (2*c + (-a+e)*t + (2*a-5*c+4*e-f)*t*t +
                                     (-a+3*c-3*e+f)*t*t*t))
        centers.append(pos[-1])
        rings = []
        for i, center in enumerate(centers):
            tangent = centers[min(i+1, len(centers)-1)] - centers[max(i-1, 0)]
            tangent.normalize()
            cross = tangent.cross(Vector((0, 1, 0)))
            if cross.length < .001:
                cross = tangent.cross(Vector((1, 0, 0)))
            cross.normalize()
            up = cross.cross(tangent).normalized()
            rings.append([center + radius*(cross*math.cos(math.tau*j/sides) +
                                           up*math.sin(math.tau*j/sides)) for j in range(sides)])
        return finish_rings(name, rings)

    def rod(name, start, end, r):
        return b.tube(name, point(*start), point(*end), r)

    def booklet(name, x, y, width, height, d, skew=6, thickness=.085):
        def shape(top, bottom, margin):
            return [(x+margin, top), (x+width-margin, top+skew),
                    (x+width-margin, bottom+skew), (x+margin, bottom)]
        plate(name+" · cloth cover", shape(y, y+4, 0), d, thickness, .002)
        plate(name+" · page block", shape(y+3, y+height-3, 3), d+.006, thickness-.009, .002)
        plate(name+" · lower board", shape(y+height-4, y+height, 0), d, thickness, .002)
        b.box(name+" · binding", (x, y+1, x+7, y+height-1), d-.001, thickness, .004)

    def collect(name, existing):
        # Maintain separate, named Outliner collections for the editable source.
        members = [o for o in bpy.context.scene.objects if o.name not in existing]
        if not members:
            return
        coll = bpy.data.collections.new(name)
        bpy.context.scene.collection.children.link(coll)
        for obj in members:
            for prior in list(obj.users_collection):
                prior.objects.unlink(obj)
            coll.objects.link(obj)

    def inventory():
        return {o.name for o in bpy.context.scene.objects}

    prior = inventory()
    b.box("Evening plaster wall", (151, -65, 1820, 760), 3.98, .12)
    # Window recess and exterior skyline, seen at the left of the camera.
    plate("Blue hour beyond window", [(-50,-70),(204,-70),(166,636),(-50,720)], 4.16, .05)
    for i in range(12):
        x = -18 + i*16
        y = rng.randint(351, 505)
        b.box("Distant apartment", (x, y, x+rng.randint(13,32), 674), 4.09, .03, .001)
    plate("Window jamb", [(157,-30),(196,-30),(151,631),(125,645)], 3.42, .17, .007)
    plate("Window sill", [(-30,630),(154,587),(153,616),(-30,667)], 3.35, .22, .009)
    plate("Upper window rail", [(-30,-25),(176,46),(175,63),(-30,-7)], 3.44, .14, .004)
    plate("Middle window rail", [(-24,184),(166,237),(164,257),(-24,206)], 3.42, .15, .003)
    plate("Corner trim", [(192,-12),(214,-16),(175,625),(154,630)], 3.57, .12)
    # The notice grid stands proud of the wall in two layers of welded wire.
    for x in (1457, 1501, 1544, 1588, 1631, 1674):
        rod("Memo rack · upright", (x, -25, 3.72), (x+4, 234, 3.72), .005)
    for y in (-15, 23, 62, 101, 141, 183, 226):
        rod("Memo rack · crosswire", (1450, y, 3.70), (1700, y+1, 3.70), .004)
    for x,y,w,h in [(1480,-28,44,47),(1497,40,109,32),(1451,82,54,94),(1493,185,46,65),(1540,99,105,105)]:
        plate("Memo rack · print", [(x,y),(x+w,y-3),(x+w+4,y+h),(x+2,y+h+3)], 3.67, .004)
        rounded("Foldback clip", (x+w*.44,y-4,x+w*.57,y+5),3.65,.01,1)
    collect("01 • Window and noticeboard", prior)

    prior = inventory()
    plate("Floating shelf · solid walnut", [(295,164),(1396,160),(1394,191),(296,195)], 3.15, .40, .006)
    b.box("Shelf shadow rail", (301,190,1380,196),3.26,.17,.005)
    for i in range(2):
        booklet("Shelf lamp book %d" % (i+1), 460,130+i*15,106,15,3.14,0,.14)
    lathe("Amber mushroom lamp · diffuser", 511,3.24,[
        (113,20,2,.06),(113,39,5,.087),(108,49,6,.113),(102,52,6,.125),
        (92,50,5,.12),(80,45,4,.103),(68,36,3,.081),(58,22,2,.051),(54,4,1,.01)])
    lathe("Mushroom lamp · stem and foot",511,3.23,[(129,28,3,.06),(125,29,3,.067),
        (123,18,2,.047),(110,14,2,.038),(103,14,2,.037),(101,20,3,.05)])
    # Instant camera body, telescoping lens barrel, shutter and flash.
    rounded("Instant camera · moulded shell",(586,71,687,162),3.19,.14,19,.008)
    rounded("Instant camera · raised grip",(586,84,608,160),3.165,.06,10,.008)
    rounded("Instant camera · flash housing",(617,76,631,90),3.172,.017,4)
    rounded("Instant camera · viewfinder",(597,84,610,103),3.159,.019,4)
    for name,rad,depth in [("Lens mount",29,3.16),("Focusing barrel",25,3.14),
                           ("Front ring",20,3.12),("Optical glass",15,3.102)]:
        rounded("Instant camera · "+name,(649-rad,123-rad,649+rad,123+rad),depth,.033,rad,.002)
    b.ellipsoid("Instant camera · shutter release",(663,78,675,88),3.15,.013)
    # Individual print cards and image emulsion, each at a slight roll.
    frame_quads = [
        [(704,31),(855,21),(866,151),(715,163)],
        [(925,30),(1034,33),(1026,161),(918,158)],
        [(1056,65),(1196,63),(1199,161),(1053,161)],
    ]
    for i, corners in enumerate(frame_quads):
        plate("Shelf photo %d · cotton paper" % (i+1),corners,3.22,.007,.002)
        p,q,r,s = [Vector(v) for v in corners]
        def card(u,v):
            return tuple(p.lerp(q,u).lerp(s.lerp(r,u),v))
        photo = plate("Shelf photo %d · image" % (i+1),[card(.07,.08),card(.93,.08),
                card(.93,.78),card(.07,.78)],3.217,.001)
        uv = photo.data.uv_layers.new(name="Print")
        corners = [(0,1),(1,1),(1,0),(0,0)]
        for loop in photo.data.loops:
            uv.data[loop.index].uv = corners[loop.vertex_index % 4]
    rounded("Print holder", (749,149,844,162),3.19,.079,2)
    # Pixel statuette consists of separate block volumes.
    for part,rect,d in [
        ("hair",(885,105,916,116),3.15),("head",(884,113,918,134),3.14),
        ("fringe",(881,111,893,125),3.125),("ear",(915,119,922,128),3.15),
        ("shirt",(886,135,916,151),3.14),("left sleeve",(880,137,887,148),3.14),
        ("right sleeve",(915,136,922,148),3.14),("left shoe",(887,151,899,161),3.14),
        ("right shoe",(905,151,916,161),3.14)]:
        b.box("Pixel shelf figure · "+part,rect,d,.036,.001)
    rounded("Question cube · diffuser", (1273,86,1343,160),3.14,.14,4,.005)
    plate("Question cube · side panel", [(1259,101),(1275,88),(1276,157),(1259,154)],3.146,.083,.002)
    for x in (1279,1334):
        for y in (94,150):
            b.ellipsoid("Question cube · corner rivet",(x-2,y-2,x+2,y+2),3.13,.006)
    collect("02 • Shelf and keepsakes", prior)

    prior = inventory()
    def leaf(base, tip, width, d, turn, other_width=None):
        # A heart-shaped pothos blade has a folded midrib, two lifted lobes,
        # a tapered tip and curvature along its length and across its breadth.
        x, y = base
        dx, dy = tip[0]-x, tip[1]-y
        length = math.hypot(dx, dy)
        nx, ny = -dy/length, dx/length
        stations = [(0,.025),(.035,.37),(.08,.63),(.14,.84),(.23,.97),
                    (.33,1),(.45,.95),(.57,.82),(.70,.59),(.82,.36),
                    (.92,.16),(.97,.056),(1,.005)]
        if other_width is None:
            other_width = width
        verts=[]
        for t,w in stations:
            for s in (-1,-.5,0,.5,1):
                lobe = .20*length*abs(s)*w*math.exp(-((t-.12)/.20)**2)
                curl = math.sin(t*math.pi)*turn
                breadth = width if s < 0 else other_width
                px = x+dx*t-dx/length*lobe+nx*(s*w*breadth+curl)
                py = y+dy*t-dy/length*lobe+ny*(s*w*breadth+curl)
                relief = -.006*math.sin(math.pi*t)*(1-abs(s))+s*.006*math.sin(math.pi*t)+.011*t*t
                verts.append(point(px,py,d+relief))
        faces=[(r*5+c,r*5+c+1,(r+1)*5+c+1,(r+1)*5+c)
               for r in range(len(stations)-1) for c in range(4)]
        o=b.mesh("Pothos · folded leaf blade",verts,faces)
        if o is not None:
            uv = o.data.uv_layers.new(name="Blade veins")
            for loop in o.data.loops:
                row, col = divmod(loop.vertex_index,5)
                t,w = stations[row]
                uv.data[loop.index].uv = (.5 + .25*(col-2)*w,t)
            for face in o.data.polygons: face.use_smooth=True
            shell=o.modifiers.new("Leaf thickness","SOLIDIFY")
            shell.thickness=.0009
    # Measurements are local to two crops of the original camera study. Each
    # entry records an actual petiole attachment and tip, both half-widths,
    # and the midrib's signed lateral bow. Edge-on leaves can be very narrow.
    left_blades = [
        (104,-14,65,36,17,19,4), (157,-19,137,17,9,12,-1),
        (192,-15,173,19,13,12,1), (242,-13,230,56,26,25,4),
        (274,-18,262,36,15,17,-4), (306,-9,313,49,17,18,2),
        (348,10,344,58,16,15,-4), (387,26,393,87,20,18,-3),
        (402,24,420,55,8,6,-4), (404,5,429,26,7,8,-3),
        (72,36,57,104,25,25,-3), (110,46,117,91,13,16,2),
        (153,14,145,67,19,15,5), (189,30,200,78,19,17,-2),
        (264,41,287,82,13,14,-6), (175,70,184,105,13,13,-3),
        (214,74,206,112,18,14,-3), (247,94,270,121,7,7,0),
        (52,106,32,131,6,7,-2), (75,104,61,158,21,20,0),
        (108,92,111,144,16,15,3), (153,94,171,164,28,30,4),
        (197,110,210,146,11,10,-2), (242,129,255,167,13,12,-1),
        (54,171,40,207,10,9,0), (75,178,65,234,19,19,4),
        (100,165,85,210,19,16,-2), (134,149,143,197,21,18,0),
        (107,202,93,238,10,10,3), (110,231,106,248,8,9,-3),
        (144,208,159,244,8,8,-4), (132,207,145,252,16,15,2),
        (196,185,190,224,12,13,-1), (198,176,215,201,10,9,0),
        (246,180,272,195,10,8,-2), (234,189,246,216,6,5,3),
        (94,247,110,291,13,14,4), (141,277,145,310,7,7,2),
        (152,273,184,307,11,8,-2), (151,316,116,325,9,9,-1),
        (166,329,196,355,9,7,-2), (159,344,177,368,9,8,2),
    ]
    right_blades = [
        (46,-11,72,34,19,20,-4), (104,-12,117,15,15,14,2),
        (104,16,107,56,16,17,0), (151,-8,156,39,17,17,-2),
        (179,26,195,67,15,15,-3), (55,40,69,68,9,8,2),
        (141,52,160,91,16,12,-4), (191,65,216,89,13,14,1),
        (237,-10,220,39,18,13,3), (264,9,241,49,12,12,1),
        (258,34,242,75,12,13,2), (276,50,252,80,10,9,-2),
        (307,-14,319,37,13,15,-3), (294,25,286,73,18,17,-2),
        (329,49,320,99,22,19,-4), (360,36,399,81,19,17,-3),
        (381,-16,374,28,11,12,-1), (289,81,283,118,14,13,-1),
        (306,110,283,148,11,8,3), (318,109,325,153,11,12,-2),
        (340,96,358,150,21,19,-2), (363,112,371,147,12,13,3),
        (309,154,297,190,12,12,-2), (363,153,381,203,18,17,-1),
        (383,140,407,176,9,10,-4), (284,216,264,267,22,22,5),
        (346,225,383,254,9,11,-4), (328,240,338,278,16,15,3),
        (380,251,408,283,8,7,2), (239,265,246,307,8,9,8),
        (298,282,326,344,28,27,1), (359,266,362,333,24,24,-2),
        (248,313,228,354,13,12,1), (329,305,330,340,7,6,-3),
        (297,355,302,401,18,18,0), (332,360,324,395,10,9,-2),
        (347,374,369,407,11,9,-6), (255,391,263,444,18,19,7),
        (333,424,298,463,16,18,0), (353,429,360,463,9,8,-5),
        (343,485,310,502,10,12,1), (353,482,363,490,4,5,-1),
        (285,507,256,530,9,11,0), (344,507,338,532,9,7,-2),
    ]
    left_stems = [
        [(154,-13),(129,2),(120,19),(97,23),(76,40)],
        [(139,-9),(130,9),(120,29),(130,61),(128,91),(123,117),
         (128,154),(123,184),(116,212),(111,242),(108,258),(117,274),(136,272)],
        [(129,84),(145,97),(152,96)], [(125,122),(108,141),(98,168)],
        [(118,194),(129,206),(132,208)], [(115,215),(98,224),(94,247)],
        [(128,191),(133,221),(136,251),(141,268),(149,276),(153,276)],
        [(135,251),(138,273),(143,292),(152,314),(160,327),(169,329)],
        [(153,314),(150,315),(146,318)], [(160,327),(163,336),(161,344)],
        [(298,-15),(275,15),(255,38),(245,72),(229,96),(238,124),(243,133)],
        [(229,96),(215,101),(197,107)], [(240,144),(231,162),(233,182),(245,184)],
        [(173,95),(181,130),(184,157),(190,173),(197,181)],
        [(307,-13),(341,4),(368,17),(394,27),(404,26)],
    ]
    right_stems = [
        [(12,23),(48,21),(83,17),(104,17),(134,8),(150,-8)],
        [(101,11),(123,29),(143,53),(160,83),(155,106)],
        [(128,-8),(159,8),(178,24),(193,43)],
        [(278,-14),(290,9),(304,44),(302,75),(309,108),(325,142),(343,163),
         (348,192),(344,216),(336,236),(313,248),(304,264),(301,285)],
        [(302,72),(304,104),(310,129),(321,152),(314,181),(306,203),
         (304,226),(309,243),(308,258),(298,282)],
        [(307,203),(299,215),(284,217)], [(343,219),(356,225),(372,244),(380,253)],
        [(340,164),(341,188),(337,211),(332,230),(339,253),(337,275),
         (340,291),(334,311),(324,338),(326,359),(333,381),(340,406),
         (341,423),(338,437),(346,454),(354,463),(354,483),(344,501),(338,518)],
        [(299,283),(283,286),(266,297),(251,306),(241,305)],
        [(248,314),(252,304),(266,296)], [(284,291),(266,301),(272,323),(285,328)],
        [(313,331),(301,350),(294,355)], [(290,328),(283,343),(278,356),(268,369),(258,391)],
        [(331,383),(338,380),(348,373)], [(343,427),(350,428),(353,429)],
        [(351,486),(345,488),(340,488)],
    ]
    for origin, blades, stems in [(190,left_blades,left_stems),(1070,right_blades,right_stems)]:
        for path in stems:
            conduit("Pothos · climbing stem",[
                (origin+x,y,3.11-max(0,y)*.00020) for x,y in path],.004,8)
        for index,(x,y,ex,ey,narrow,wide,bow) in enumerate(blades):
            depth = 3.095-max(0,y)*.00020-.007*(index%4)
            leaf((origin+x,y),(origin+ex,ey),narrow,depth,bow,wide)
    collect("03 • Trailing pothos",prior)

    prior=inventory()
    # Paired arms, central spindles, wiring and a flared double-wall metal shade.
    for a,c in [((14,633,2.03),(3,509,2.10)),((25,629,2.03),(13,509,2.10)),
                ((3,508,2.10),(94,348,2.17)),((20,511,2.10),(108,352,2.17)),
                ((96,341,2.17),(208,291,2.18)),((108,357,2.17),(213,303,2.18))]:
        rod("Anglepoise · articulated parallel arm",a,c,.009)
    for x,y,r in [(8,508,14),(99,348,16),(211,300,12)]:
        b.ellipsoid("Anglepoise · hinge casting",(x-r,y-r,x+r,y+r),2.155,.045)
        b.ellipsoid("Anglepoise · exposed pivot",(x-3,y-3,x+3,y+3),2.124,.01)
    conduit("Anglepoise · braided power cable",[(28,645,2.09),(29,557,2.11),(12,501,2.14),
        (49,426,2.17),(90,345,2.18),(146,322,2.20),(210,299,2.22)],.0032)
    # The opening points down-left. Both inner shade and rolled metal rim are modeled.
    rings=[]
    for x,y,rx,ry,tilt,d,spread in [(226,248,18,5,-5,2.17,.025),(227,251,21,6,-5,2.17,.03),
             (241,310,26,7,-8,2.16,.039),(246,321,23,6,-8,2.155,.037),
             (249,326,32,7,-10,2.15,.047),(259,350,48,10,-14,2.145,.063),
             (268,380,62,13,-19,2.14,.088),(273,406,73,16,-21,2.13,.104),
             (273,407,73,16,-21,2.13,.104),(273,405,69,14,-20,2.13,.10),
             (263,378,57,12,-17,2.14,.083),(249,339,25,6,-8,2.15,.037),
             (245,327,14,3,-4,2.15,.019)]:
        rings.append([point(x+rx*math.cos(a),y+ry*math.sin(a)+tilt*math.cos(a),
                            d-spread*math.sin(a)) for a in [math.tau*j/64 for j in range(64)]])
    finish_rings("Anglepoise · spun shade and rolled lip",rings)
    b.ellipsoid("Anglepoise · frosted globe",(245,362,300,410),2.112,.066)
    # Stationery cup has a recessed interior, punched dimples and separate pencils.
    plate("Pencil cup · square vessel", [(-9,610),(79,609),(106,600),(106,727),(75,739),(-9,735)],1.82,.094,.006)
    plate("Pencil cup · dark opening",[(-9,608),(75,608),(100,601),(14,599)],1.82,.008)
    for row in range(3):
        for col in range(4):
            x,y=9+col*16,638+row*19
            b.ellipsoid("Pencil cup · stamped dimple",(x-1,y-1,x+1,y+1),1.811,.002)
    for i,(x,y,ex,ey,rad) in enumerate([(18,608,11,578,.005),(46,609,43,568,.007),
             (59,607,73,549,.006),(70,606,95,552,.006),(36,609,35,580,.006),(56,608,61,575,.006)]):
        rod("Writing instrument · barrel",(x,y,1.858),(ex,ey,1.864),rad)
        rod("Writing instrument · cap",(ex,ey,1.864),(ex+(ex-x)*.07,ey-5,1.864),rad*1.16)

    def rounded_path(anchors, closed=False, steps=4):
        """Subdivide a measured contour, interpolating through each traced point."""
        pts = [Vector(p) for p in anchors]
        def at(i):
            return pts[i % len(pts)] if closed else pts[max(0,min(i,len(pts)-1))]
        samples = []
        for i in range(len(pts) if closed else len(pts)-1):
            a,p,q,c = (at(i+j) for j in (-1,0,1,2))
            for j in range(steps):
                t = j/steps
                samples.append(.5*(2*p+(q-a)*t+(2*a-5*p+4*q-c)*t*t+
                                     (3*p-3*q+c-a)*t*t*t))
        if not closed: samples.append(pts[-1])
        return samples

    # A single ceramic shell contains the face and ears. The rim follows the
    # photographed contour, while elliptical front and back sections give it
    # its observed rounded belly without separately floating eyes or ears.
    contour = rounded_path([
        (138.9,624),(140.5,607),(145.1,591),(151.0,575),(157.0,561),
        (165.9,549),(172.4,544.8),(177.6,544.6),(183.6,547.1),(192.2,554.8),
        (195.0,557.2),(202.7,556.6),(211.9,556.7),(220.1,548.5),
        (225.8,543.9),(231.4,543.5),(237.2,547.3),(244.9,557.5),
        (252.6,574.4),(260.4,597.3),(264.2,617.7),(264.4,628.0),
        (261.3,642.5),(255.6,653.4),(246.8,662.5),(235.0,667.0),
        (217.6,669.4),(195.1,670.4),(174.6,669.0),(161.8,666.1),
        (151.6,660.4),(143.9,648.2),(139.7,636.2),
    ],closed=True)
    center = Vector((202,622))
    rings = []
    for k in range(1,36):
        phi = math.pi*k/36
        shell = []
        for edge in contour:
            u,v = center.lerp(edge,math.sin(phi))
            # The two molded ear tips sit slightly behind the forehead.
            ear = max(0.,min(1.,(574-v)/31))
            depth = 1.989-.086*math.cos(phi)+.010*ear*ear
            shell.append(point(u,v,depth))
        rings.append(shell)
    finish_rings("Cat lantern · porcelain body and molded ears",rings)

    def turned_prop(name,d,profile):
        # Each ring has its own measured center, width, foreshortening and
        # lateral tilt. The visible contour stays registered to the camera.
        rings = []
        for x,y,rx,ry,tilt in profile:
            vertices=[]
            for j in range(96):
                a = math.tau*j/96
                co,si = math.cos(a),math.sin(a)
                vertices.append(point(x+rx*co,y+ry*si+tilt*co,d-rx*d/1300*si))
            rings.append(vertices)
        return finish_rings(name,rings)

    turned_prop("Cat lantern · wooden foot",1.989,[
        (201.3,683.0,52.6,7.5,-1.3),(201.2,683.1,55.3,8,-1.3),
        (201.2,681.8,56.1,8.3,-1.3),(201.3,667.9,55.9,6.7,-1.3),
        (201.3,667.0,54.9,6.9,-1.3),(201.3,666.5,48,6.3,-1.2),
    ])
    turned_prop("Coffee coaster · cork",1.899,[
        (352.1,705.4,56.6,10.4,-1.3),(352.1,704.6,59.2,12.0,-1.3),
        (352.1,703.2,60.0,12.6,-1.3),(352.1,690.2,60.1,10.2,-1.3),
        (352.1,688.9,59.7,10.6,-1.3),(352.1,688.4,57.4,10.1,-1.3),
    ])
    # The roll at the rim returns into a continuous hollow cup wall.
    turned_prop("Stoneware mug · thrown ceramic",1.901,[
        (350.5,686.1,44.5,9.0,-1.4),(350.4,685.4,46.8,10.9,-1.4),
        (350.3,683.6,47.4,11.6,-1.4),(350.0,649,49.1,9.6,-1.3),
        (349.6,616,50.3,8.2,-1.3),(349.5,591.4,51.3,7.0,-1.2),
        (349.5,590.6,51.5,6.9,-1.2),(349.5,590.0,50.0,6.8,-1.2),
        (349.5,590.0,48.5,6.25,-1.2),(349.5,590.5,47.3,5.95,-1.2),
        (349.5,592.1,47.2,6.0,-1.2),(350.1,615.0,46.8,7.7,-1.2),
        (350.4,672.0,43.0,9.0,-1.2),(350.5,676.2,39.4,8.4,-1.2),
    ])
    turned_prop("Coffee · meniscus",1.901,[
        (349.5,596.1,47.1,6.1,-1.2),(349.5,595.6,47.1,6.1,-1.2),
        (349.5,596.1,44.5,5.7,-1.2),
    ])
    outer = rounded_path([(309,608.0),(300,608.0),(288,610.7),(279,617.1),
        (272.5,627.8),(270.5,638.8),(271.7,648.3),(276.1,658.2),
        (283.7,665.8),(293.5,670.6),(302.8,672.8),(308.0,673.1)])
    inner = rounded_path([(309,619.8),(300,619.6),(293.6,621.1),(288.8,625.3),
        (285,631.8),(283.3,639.0),(283.7,645.3),(286.7,652.6),
        (290.9,657.3),(297.6,660.1),(303.1,660.7),(308.0,660.0)])
    rings = []
    for outside,inside in zip(outer,inner):
        center,radial = (outside+inside)*.5,(outside-inside)*.5
        ring = []
        for j in range(20):
            a = math.tau*j/20
            p = center+radial*math.cos(a)
            ring.append(point(p.x,p.y,1.895-.009*math.sin(a)))
        rings.append(ring)
    finish_rings("Stoneware mug · handle",rings)
    collect("04 • Desk lamp, coffee and stationery",prior)

    prior=inventory()
    # Tower side faces the camera. The side glass sits in an inset channel.
    plate("PC · chamfered enclosure",[(1471,291),(1688,232),(1704,719),(1666,749),
            (1463,670)],1.91,.46,.009)
    plate("PC · tinted side glass",[(1483,310),(1681,255),(1688,689),(1483,632)],1.891,.006,.002)
    plate("PC · lower case rail",[(1470,630),(1692,697),(1695,727),(1470,660)],1.87,.064,.003)
    plate("PC · upper case rail",[(1470,290),(1688,231),(1684,254),(1474,312)],1.87,.068,.003)
    b.box("PC · side retainer", (1469,305,1480,648),1.868,.048,.002)
    for x,y in [(1485,315),(1483,630),(1659,273),(1654,682)]:
        b.ellipsoid("PC · thumbscrew",(x-2.7,y-2.7,x+2.7,y+2.7),1.861,.009)
    plate("PC · motherboard",[(1519,335),(1651,307),(1657,633),(1517,602)],1.945,.022,.003)
    # Fans sit on the side of the enclosure, giving an elliptical silhouette.
    def fan(name, cx, cy, rx, ry, d):
        rounded(name+" · surround",(cx-rx-4,cy-ry-5,cx+rx+4,cy+ry+5),d+.013,.04,9)
        rings=[]
        for s,extra in [(1,.018),(1,0),(.96,-.005),(.87,-.006),(.85,.006),(.85,.022)]:
            rings.append([point(cx+rx*s*math.cos(a),cy+ry*s*math.sin(a),d+extra)
                          for a in [math.tau*j/56 for j in range(56)]])
        finish_rings(name+" · illuminated annulus",rings)
        for i in range(7):
            a = math.tau*i/7
            shape=[]
            for radial,angle in [(.16,-.34),(.49,-.41),(.82,-.34),(.84,-.08),
                                 (.73,.22),(.57,.24),(.30,.06),(.16,.06)]:
                shape.append((cx+rx*radial*math.cos(a+angle),cy+ry*radial*math.sin(a+angle)))
            plate(name+" · swept impeller blade",shape,d+.002,.003,.001)
        b.ellipsoid(name+" · spindle cap",(cx-rx*.22,cy-ry*.22,cx+rx*.22,cy+ry*.22),d-.003,.012)
    fan("Upper intake fan",1543,408,48,56,1.883)
    fan("PSU shroud fan",1592,589,42,53,1.882)
    for x in (1609,1625):
        plate("PC · memory module",[(x,349),(x+7,347),(x+8,459),(x,459)],1.882,.019,.002)
    plate("PC · graphics card",[(1507,497),(1649,477),(1670,491),(1666,523),(1507,539)],1.896,.044,.004)
    for i in range(11):
        x=1525+9*i
        rod("PC · cooling fin",(x,505,1.884),(x,520,1.884),.0015)
    collect("05 • Tempered-glass workstation",prior)

    prior=inventory()
    # Small understory plant partly hidden behind the right monitor edge.
    lathe("Desk plant · glazed cachepot",1325,2.052,[(678,31,5,.052),(673,43,6,.07),
        (653,44,7,.071),(595,50,8,.079),(590,50,8,.079),(590,47,7,.075),(600,44,7,.069)])
    for x,y,tx,ty in [(1313,587,1306,544),(1321,588,1344,521),(1330,586,1374,538),
                       (1321,591,1294,562),(1329,587,1358,560)]:
        conduit("Desk plant · petiole",[(x,y,2.06),((x+tx)/2,(y+ty)/2,2.05),(tx,ty,2.045)],.003)
        for s in [-1,1]:
            leaf((tx,ty),(tx+s*22,ty+rng.uniform(8,23)),10.7,2.032,s*1.8)
    booklet("Hardback · lower volume",1322,675,242,33,1.92,15,.15)
    booklet("Hardback · upper volume",1338,638,210,41,1.921,19,.13)
    # The miniature astronaut has a nested smoked visor and a separate suit and boots.
    b.ellipsoid("Astronaut · life support pack",(1389,591,1413,630),1.998,.029)
    b.ellipsoid("Astronaut · pressure suit",(1394,591,1452,642),1.986,.06)
    for rect in [(1391,601,1409,634),(1441,604,1458,633)]:
        b.ellipsoid("Astronaut · glove and arm",rect,1.976,.026)
    for rect in [(1396,631,1416,644),(1429,632,1447,646)]:
        b.ellipsoid("Astronaut · boot",rect,1.963,.032)
    b.ellipsoid("Astronaut · bubble helmet",(1378,544,1460,607),1.986,.086)
    b.ellipsoid("Astronaut · inset visor gasket",(1384,553,1456,603),1.944,.03)
    b.ellipsoid("Astronaut · smoked visor",(1389,556,1455,600),1.936,.026)
    for x in [1380,1457]:
        b.ellipsoid("Astronaut · ear receiver",(x-8,563,x+6,595),1.973,.03)
    star=[]
    for i in range(10):
        a=math.pi*i/5-math.pi/2
        r=8 if i%2==0 else 3.7
        star.append((1419+r*math.cos(a),619+r*math.sin(a)))
    plate("Astronaut · suit badge",star,1.947,.003,.0005)
    collect("06 • Desk plant, books and astronaut",prior)
