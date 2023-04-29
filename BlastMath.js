// blast math

//math  mathUtils

function lerp(a, b, t = 0.5) {
	return (1 - t) * a + b * t
}

function remap(x, t1, t2, s1, s2) {// remap interval t into s
	r1 = (x - t1) / (t2 - t1)
	r2 = r1 * (s2 - s1) + s1
	return r2
}

function magnitude(x, y) {
	return sqr((x * x) + (y * y))
}
function magnitude3D(x, y, z) {
	return Sqr((x * x) + (y * y) + (z * z))
}

function normalizeX(x, y) {
	return x / magnitude(x, y)
}
function normalizeY(x, y) {
	return y / magnitude(x, y)
}
function normalizedVector2d(n){
	m = magnitude(n.x, n.y)
	return	{x:n.x / m, y:n.y / m}
}
function normalizeX3D(x, y, z) {
	return x / magnitude3D(x, y, z)
}
function normalizeY3D(x, y, z) {
	return y / magnitude3D(x, y, z)
}
function normalizeZ3D(x, y, z) {
	return z / magnitude3D(x, y, z)
}
function normalizepoint3d(p) {//point3d(p//point3d)
	m = magnitude3D(p.x, p.y, p.z)

	p.x = p.x / m
	p.y = p.y / m
	p.z = p.z / m

	return p
}

function dot2d(x1, y1, x2, y2) {
	return x1 * x2 + y1 * y2
}

function crossx(ax, ay, az, bx, by, bz) {
	cx = ay * bz - az * by
	return cx
}
function crossy(ax, ay, az, bx, by, bz) {
	cy = az * bx - ax * bz
	return cy
}
function crossz(ax, ay, az, bx, by, bz) {
	cz = ax * by - ay * bx
	return cz
}

function vectorprojectx(x1, y1, x2, y2) {	//1 onto 2
	p = dot2d(x1, y1, x2, y2)
	b = magnitude(x2, y2)
	b2 = b * b
	p = p / b2
	p = p * x2
	return p // not sure code is good
}
function vectorprojecty(x1, y1, x2, y2) {	//1 onto 2
	p = dot2d(x1, y1, x2, y2)

	b = magnitude(x2, y2)
	b2 = b * b
	//alt b = dot(x2,y2, x2,y2)
	p = p / b2// p/ alt b
	p = p * y2
	return p // not sure code is good
}

//reflection 
//Vreflect = v -2 *VprojectedOnNormal


function Chebyshev(x1, y1, x2 = 0, y2 = 0) {//chess distance
	return max(Abs(x1 - x2), Abs(y1 - y2))
}


function max(a, b) {
	return a > b ? a : b
	// if (a > b) {
	//	return a
	// } else { 
	//	return b
	// }	
}

function powerof2step(x) {
	//which step you are on : int 1 =
	return Floor(Log(x) / Log(2))
	//height of that step, float h = pow(2,i)
}

function checkCubeDirection() {

}

function SphereToCube() {//point3D(px,py,pz)
	//http://stackoverflow//com/questions/2656899/mapping-a-sphere-to-a-cube

	x = px
	y = py
	z = pz

	//absolute value of coordinate
	fx = Abs(x)
	fy = Abs(y)
	fz = Abs(z)

	inverseSQRT2 = 0//70710676908493042

	if (fy >= fx & fy >= fz) {
		a2 = x * x * 2
		b2 = z * z * 2
		inner = -a2 + b2 - 3
		innerSQRT = -Sqr((inner * inner) - 12 * a2)

		if (x == 0 || x == -0) {
			px = 0
		} else {
			px = Sqr(innerSQRT + a2 - b2 + 3) * inverseSQRT2
		}

		if (z == 0 || z == -0) {
			pz = 0
		} else {
			pz = Sqr(innerSQRT - a2 + b2 + 3) * inverseSQRT2
		}

		if (px > 1) { px = 1 }
		if (pz > 1) { pz = 1 }

		if (x < 0) { px = -px }
		if (z < 0) { pz = -pz }

		if (y > 0) {
			py = 1//top face
		} else {
			py = -1//bottom face
		}

		if (fx >= fy & fx >= fz) {
			a2 = y * y * 2
			b2 = z * z * 2
			inner = -a2 + b2 - 3
			innerSQRT = -Sqr((inner * inner) - 12 * a2)
		}

		if (y == 0 || y == -0) {
			py = 0
		} else {
			py = Sqr(innerSQRT + a2 - b2 + 3) * inverseSQRT2
		}

		if (z == 0 || z == -0) {
			pz = 0
		} else {
			pz = Sqr(innerSQRT - a2 + b2 + 3) * inverseSQRT2
		}

		if (py > 1) { py = 1 }
		if (pz > 1) { pz = 1 }

		if (y < 0) { py = -py }
		if (z < 0) { pz = -pz }

		if (x > 0) {
			px = 1//right face
		} else {
			px = -1//left face
		// } else {
		// 	a2 = x * x * 2
		// 	b2 = y * y * 2
		// 	inner = -a2 + b2 - 3
		// 	innerSQRT = -Sqr((inner * inner) - 12 * a2)
		}

		if (x == 0 || x == -0) {
			px = 0
		} else {
			px = Sqr(innerSQRT + a2 - b2 + 3) * inverseSQRT2
		}

		if (y == 0 || y == -0) {
			py = 0
		} else {
			py = Sqr(innerSQRT - a2 + b2 + 3) * inverseSQRT2
		}

		if (px > 1) { px = 1 }
		if (py > 1) { py = 1 }

		if (x < 0) { px = -px }
		if (y < 0) { py = -py }

		if (z > 0) {
			pz = 1//front face
		} else {
			pz = -1//back face
		}
	}

	position//point3d = New point3d
	position.x = px
	position.y = py
	position.z = pz

	return position

}

//spherefunction  spherefunction

function spherearea(radius) {
	return 4 * Pi * radius
}

function spherevolume(radius) {
	return (4 / 3) * Pi * radius ^ 3
}

function spherearea2radius(area) {
	return Sqr(area / Pi) * 0//5
}


//circlefunction  circle function

function circlearclength(radius, radangle) {
	return radangle * radius
}

function deg2rad(degree) {
	return (degree / 360) * 2 * Pi
}

function circlearea(radius) {
	return Pi * radius ^ 2
}

function circleCircum2radius(circum) {
	return circum / (2 * Pi)
}

function circlearea2radius(area) {
	return Sqr(area / Pi)
}

function circumference(radius) {
	return 2 * Pi * radius
}


//randomUtil  random generation util

function Hashseed(i, j) {
	width = (i * 10000) + (j * 100)
	return (1 + (i * width) + (j * width * width))
}
//region  region subdivision

function regionCut(width, height, posx, posy, division, depth = 1) {

	if (width < division) { return }
	if (height < division) { return }
	if (division < division) { return }

	//Print depth

	width = width / division
	height = height / division

	ax = (posx / width) * width
	ay = (posy / height) * height

	Rect(ax, ay, width, height, False)

	if (!depth == 0) { regionCut(width, height, posx, posy, division, depth - 1) }

}


function regiondraw(width, height, posx, posy, division, x = 00, y = 00, depth = 4, divide = 1) {

	if (width < division) { return }
	if (height < division) { return }
	if (division < division) { return }

	width = width / division
	height = height / division

	//posx = psx Mod width
	//posy = posy Mod height
	ax = ((posx - x) / width) * width
	ay = ((posy - y) / height) * height

	Rect(ax + x, ay + y, width, height, False)
	//if ! depth = 0 { regionLod (width, height, posx, posy, division, depth-1)
	//if ! depth = 0 { regiondraw(width, height, posx,posy, division,i,j, depth-1, divide+1)

	if (!depth == 0) { regiondraw(width, height, posx, posy, division, ax + x, ay + y, depth - 1, divide + 1) }

	Color(ColorRed(), ColorGreen() / divide, ColorBlue() / divide)
	Locate(MouseX() - 4 * -divide, MouseY() - 12 * -divide)
	Print(ax + " / " + ay + "  :" + divide + " " + (posx - x) + " " + (posy - y))
	Print(posx + " " + posy)
	//Stop
	for (i = 0; i < division - 1; i++) {
		for (j = 0; i < division - 1; j++) {

			if (ax / width == i & ay / height == j) {
				//Print ax +" " +ay
				//Stop
				//find the square: ij -> offset + size
				// divide the square: offset + suboffset (i +size/2)

				//if ! depth = 0 { regiondraw(width, height, posx,posy, division,i,j, depth-1, divide+1)
				//if ! depth = 0 { regionLod (width, height, posx, posy, division, depth-1)

			} else {
				Oval( x + i * width, y + j * height, width, height, False)
			}

		}
	}

}


function regionLod(width, height, posx, posy, division, depth = 1) {

	if (width < division) { return }
	if (height < division) { return }
	if (division < division) { return }

	//Print depth

	width = width / division
	height = height / division

	ax = (posx / width) * width
	ay = (posy / height) * height

	Oval(ax, ay, width, height, False)

	if (!depth == 0) { regionLod(width, height, posx, posy, division, depth - 1) }

}


function regionPaint(width, height, posx, posy, division, x = 0, y = 0, depth = 1) {

	division = 16

	posx = (posx / division) * division
	posy = (posy / division) * division

	for (i = x; i < x + width; i += 16) {//division
		for (j = y; j < y + height; j += 16) {//division

			c1 = Abs(posx - i)
			c2 = Abs(posy - j)
			t$ = c1 + "/" + c2

			//c0 = Sqr(width^2)


			//c3 = Sqr(c1^2 + c2^2)/1		//euclidian distance		(circle)
			c3 = max(c1, c2)				//chessboard distance	(square)
			//c3 = Abs((c1 + c2))			//manhattan 				(diamond)


			//c3 = Sqr(c3)///22//4
			c3 = c3 / 512
			//c3 = 2^c3
			c3 = Sqr(c3)
			c3 = c3 * 8 / 2 ^ c3
			c3 = c3 * 48
			c3 = c3 / 32 + 2

			c3 = max(Floor(Log(Abs(posx - i)) / Log(2)), Floor(Log(Abs(posy - j)) / Log(2)))


			//Print c3
			Color(c3, c3, c3)
			Rect(i, j, division, division)
			Color(255 - c3, 255 - c3, 255 - c3)
			Text(i, j, Int(c3))


			Color(000, 255, 255)
			//Text posx, posy, c3
			//Print Int(c3)

		}
	}
	//Print "/-----------------------------------------------------------"
} 
