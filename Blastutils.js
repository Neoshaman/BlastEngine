//utils



//drawing //------------------------------------------- drawing

function makeQuad(division, size=1){

	quad = CreateMesh()
	surface = CreateSurface (quad)
	
	division = division +1
	d2 = division*division
	S = size/(division-1)//step size
		
	
	//center = 0 -> corner, center = 1 -> center offset
	center = 1
	offset = 0;	if ( center = 1 ) {offset = - (size) / 2}

	offset_u = 0
	offset_v = 0
	
	
	for (i=0 To d2){//

	//generate vertex position, depend on axis xz=0, xy=1, zy=2
			x = offset + ( i % division )*s
			y = offset + ( i/division )*s //( i/s )
			z = 0
			
				//uv
			u = offset_u + x / division / (size/division) //
			v = offset_v + y / division / (size/division) //
			w = 0
	
		AddVertex (surface, x,y,z,  u,-v,w)
	
	//generate triangle (independant from vertex generation but need to correlate at the end)
		w1 = i
		w2 = i+1
		w3 = i+division +1
		w4 = i+division 
		
		if ( i % division == division -1 ) Goto skip
		if ( i >= d2 - division ) Goto skip
					
		AddTriangle (surface, w1,w3,w2)
		AddTriangle (surface, w1,w4,w3)
	
		//skip		
	}	

	UpdateNormals (quad)
	return quad
	
}

function makePlane(size_x,size_y, tilesize=1, axis=1, center=0){
	
	size_x = size_x+1
	size_y = size_y+1
	
	// row enumeration (size_x)
	size_total = size_x * size_y -1
	
	plane = CreateMesh()
	surface = CreateSurface (plane)
		
	//center = 0 -> corner, center = 1 -> center offset
	offset = 0
	
	if ( center == 1 ) {offset = -( (size_x-1) * tilesize ) / 2}

	offset_u = 0
	offset_v = 0
	
	//______________________________________________________ loop
	for (i=0 To size_total){ //

	//generate vertex position, depend on axis xz=0, xy=1, zy=2
		switch (axis){
			//__________________________________________
			Case 0//xz floor
			x = offset + ( i % size_x )	*tilesize
			z = offset + ( i/size_x )		*tilesize
			y = 0
				//uv
			u = offset_u + x / tilesize / (size_x-1) //
			v = offset_v + z / tilesize / (size_x-1) //
			w = 0
			//__________________________________________
			Case 1//xy forward wall
			x = offset + ( i % size_x )	*tilesize
			y = offset + ( i/size_x )		*tilesize
			z = 0
				//uv
			u = offset_u + x / tilesize / (size_x-1) //
			v = offset_v + y / tilesize / (size_x-1) //
			w = 0
			//__________________________________________
			Case 2//zy side wall
			z = offset + ( i % size_x )	*tilesize
			y = offset + ( i/size_x )		*tilesize
			x = 0
				//uv
			u = offset_u + z / tilesize / (size_x-1) //
			v = offset_v + y / tilesize / (size_x-1) //
			w = 0
			//__________________________________________
		}	
	
		AddVertex (surface, x,y,z,  u,-v,w)
	
	//generate triangle (independant from vertex generation but need to correlate at the end)
		w1 = i
		w2 = i+1
		w3 = i+size_x +1
		w4 = i+size_x 
		
		if ( i % size_x == size_x-1 ) Goto skip
		if ( i >= size_total-size_x ) Goto skip
					
		AddTriangle (surface, w1,w3,w2)
		AddTriangle (surface, w1,w4,w3)
	
		//skip	
		
	}	
	//______________________________________________________ /loop

	UpdateNormals( plane)
	return plane
}

function makecube(size=1){
	
	size = size/2
	cube = CreateMesh ()
	c = makequad(10)
	
	cu	= CopyMesh (c); RotateMesh( cu,  90,0,0); PositionMesh (cu, 0, size,0)
	cd	= CopyMesh (c); RotateMesh (cd, -90,0,0); PositionMesh (cd, 0,-size,0)
	
	cl	= CopyMesh (c); RotateMesh (cl, 0, 90,0); PositionMesh (cl,  size,0,0)
	cr	= CopyMesh (c); RotateMesh (cr, 0,-90,0); PositionMesh (cr, -size,0,0)
	
	cf	= CopyMesh (c); RotateMesh (cf, 0,180,0); PositionMesh (cf, 0,0, size)
	cb	= CopyMesh (c); RotateMesh (cb, 0,000,0); PositionMesh (cb, 0,0,-size)


	copysurface (cu, cube)
	copysurface (cd, cube)

	copysurface (cl, cube)
	copysurface (cr, cube)

	copysurface (cf, cube)
	copysurface (cb, cube)
		
	FreeEntity (c)
	
	FreeEntity (cu)
	FreeEntity (cd)

	FreeEntity (cl)
	FreeEntity (cr)

	FreeEntity (cf)
	FreeEntity (cb)
	
	UpdateNormals (cube)
	return cube
	
}

function makesphere(){

	sphere = makecube()
	
	//surface = GetSurface (sphere,1)
	for (j = 1 To CountSurfaces (sphere)){
		for (i =0 To CountVertices(GetSurface(sphere,j))-1){
			catsphere(GetSurface (sphere,j),i)
		}
	}
	
	UpdateNormals (sphere)
	return sphere
	
}

function catsphere(surface,i, radius = 1){
	
	//method with no deformation around the pole
	//_____________________________________________________________

	x = VertexX (surface,i) *2
	y = VertexY (surface,i) *2
	z = VertexZ (surface,i) *2
	
	
	x2 = x*x
	y2 = y*y
	z2 = z*z
	
	a = (x2 / 2.0)
	b = (y2 / 2.0)
	c = (z2 / 2.0)
	
	sx =  Sqr(1.0 - b - c + ( (y2 * z2) / 3.0 ) ) * x / 2
	sy =  Sqr(1.0 - c - a + ( (x2 * z2) / 3.0 ) ) * y / 2
	sz =  Sqr(1.0 - a - b + ( (x2 * y2) / 3.0 ) ) * z / 2
	
	//sx = x * Sqr(1 - (y2 / 2) - (z2 / 2) + ((y2 * z2) / 3))
	//sy = y * Sqr(1 - (x2 / 2) - (z2 / 2) + ((x2 * z2) / 3))
	//sz = z * Sqr(1 - (x2 / 2) - (y2 / 2) + ((x2 * y2) / 3))
	
	sx = sx*radius
	sy = sy*radius
	sz = sz*radius
	//_____________________________________________________________
	
	
	//naive method with deformation around pole
	//sx = normalizeX3D(x,y,z)*radius/2
	//sy = normalizeY3D(x,y,z)*radius/2
	//sz = normalizeZ3D(x,y,z)*radius/2
	
	VertexCoords (surface, i, sx,sy,sz)

}

function Copysurface (source, target){

	surface = CreateSurface(target) 
	copy = GetSurface(source, 1)
	
	for (i = 0 To CountVertices (copy)-1){
		AddVertex ( surface, VertexX(copy,i),VertexY(copy,i),VertexZ(copy,i), VertexU(copy,i),VertexV(copy,i),VertexW(copy,i) )
	}

	for (i = 0 To CountTriangles (copy)-1){
		AddTriangle (surface, TriangleVertex (copy,i,0),TriangleVertex (copy,i,1),TriangleVertex (copy,i,2) )
	}
	
} 

function Circle(x,y, radius){//draw circle on screen
	Oval (x-radius*0.5, y-radius*0.5,  radius,radius,0)
	Plot (x,y)
}

//datastructure //------------------------------------------- DataStructure

Type point3d
	Field x
	Field y
	Field z
End Type

//controller //------------------------------------------- control

function Controlentity(entity, speed=1, turnrate=1){
	//key translation
		//l/r	x axis
	if ( KeyDown(32) ) {MoveEntity (entity,  speed,0,0)}	//d
	if ( KeyDown(30) ) {MoveEntity (entity, -speed,0,0)}	//q
		//u/d	y axis
	if ( KeyDown(16) ) {MoveEntity (entity, 0, speed,0)}	//a
	if ( KeyDown(18) ) {MoveEntity (entity, 0,-speed,0)}	//e
		//f/b	z axis
	if ( KeyDown(17) ) {MoveEntity (entity, 0,0, speed)}	//z
	if ( KeyDown(31) ) {MoveEntity (entity, 0,0,-speed)}	//s
	
	//key rotation
		//roll
	if ( KeyDown(23) ) {TurnEntity (entity,  turnrate,0,0)}	//i
	if ( KeyDown(37) ) {TurnEntity (entity, -turnrate,0,0)}	//k
		//pitch
	if ( KeyDown(36) ) {TurnEntity (entity, 0, turnrate,0)}	//j
	if ( KeyDown(38) ) {TurnEntity (entity, 0,-turnrate,0)}	//l
		//yaw
	if ( KeyDown(22) ) {TurnEntity (entity, 0,0, turnrate)}	//u
	if ( KeyDown(24) ) {TurnEntity (entity, 0,0,-turnrate)}	//o

	//mice
	//TurnEntity entity, 0,MouseY(), MouseX() //faulty take absolute position
	//TurnEntity entity, MouseYSpeed(), -MouseXSpeed(),0//faulty 
	
	
	//controller
	
	if ( JoyXDir() != 0 ) {MoveEntity (entity,	JoyX(),0,0) }//lr
	if ( JoyYDir() != 0 ) {MoveEntity (entity,	0,0,-JoyY())}//fb
	if ( JoyZDir() != 0 ) {TurnEntity (entity,	0,0, JoyZ())}//roll
 
	//yaw = up down
	//pitch = lr
	if ( Abs(JoyYaw ()/180) > .2 ) {TurnEntity (entity, (JoyYaw ()/180), 0,0)}//roll
	if ( Abs(JoyPitch()/180) > .2 ) {TurnEntity (entity, 0,-JoyPitch()/180, 0)}//pitch
	
	//going up-down; y-a
		
	got = GetJoy()
	if ( got != 0 ) button = got
	switch (got){
		Case 1;MoveEntity (entity, 0,  speed,0)//a - down
		Case 2;WireFrame (True)//b
		Case 3;WireFrame (False)//x
		Case 4;MoveEntity (entity, 0, -speed,0)//y - up
		
		Case 5//rb
		Case 6//lb
		
		Case 7;PositionEntity (entity, 0,0,0); RotateEntity (entity, 0,0,0)//select - reset
		Case 8;ClearWorld() ;End() //start
		
		Case 9//l3
		Case 10//r3
	}

}

function showjoystate(o=0){
	Text (000,000+o, JoyType())
	Text (000,020+o, button )
	
	Text (000,040+o, "JoyX     ;"+ JoyX())//l stick analog x360
	Text (000,060+o, "JoyY     ;"+ JoyY())//l stick analog
	Text (000,080+o, "JoyZ     ;"+ JoyZ())//trigger analog
	Text (000,100+o, "JoyU     ;"+ JoyU())//none
	Text (000,120+o, "JoyV     ;"+ JoyV())//none

	Text (000,140+o, "JoyXDir  ;"+ JoyXDir())//l stick digital
	Text (000,160+o, "JoyYDir  ;"+ JoyYDir())//l stick digital
	Text (000,180+o, "JoyZDir  ;"+ JoyZDir())//trigger digital
	Text (000,200+o, "JoyUDir  ;"+ JoyUDir())//none
	Text (000,220+o, "JoyVDir  ;"+ JoyVDir())//none

	Text (000,240+o, "JoyPitch ;"+ JoyPitch())	//r stick angle
	Text (000,260+o, "JoyYaw   ;"+ JoyYaw()	)	//r stick angle
	Text (000,280+o, "JoyRoll  ;"+ JoyRoll())		//none
	Text (000,300+o, "JoyHat   ;"+ JoyHat()	)	//dpad angle
	
	Text (000,340+o, Abs(JoyPitch ()/180))

	
	got = GetJoy()
	if ( got != 0 ) button = got
	//a 1
	//b 2
	//x 3
	//y 4
	
	//rb 6
	//lb 5
	
	//select 7
	//start 8

	//l3 9
	//r3 10
}




//camera //------------------------------------------- camera

function SetCameraFov(camera, FoV){
	CameraZoom (camera, 1.0/Tan(FoV/2.0))
}

//experimental not validated
function pixelCoverage(height, distance, fov){
	return (height/distance)/2.0 * Tan(fov/2.0)*GraphicsHeight()
}


//misc

function BaseSetup2d(){
	
	Graphics (800,600,16,2)
	SetBuffer (BackBuffer())
		
}

function BaseSetup3d(){
	
	Graphics3D (800,600,16,2)
	SetBuffer (BackBuffer())
	
	//-------------------------------------------
	cam = CreateCamera ()
	PositionEntity (cam, 0,0,-5)
	
	l1 = CreateLight (1)
	RotateEntity (l1, 45,45,0)
	
	tex=LoadTexture( "testure//jpg" )
	
	plane = CreatePlane ()
	PositionEntity (plane, 0,-8,0)
	EntityColor (plane, 64,32,16)
	EntityTexture (plane,tex)
	//-------------------------------------------
	
}


function DisplayTest3D(){

	while (!KeyDown(1)){
	
		UpdateWorld (1)
		RenderWorld (1)
		VWait() ;Flip (False)
    }
	
	ClearWorld ()
	End()
}
