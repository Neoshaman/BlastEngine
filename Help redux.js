function arrowGrid(){
    whiteBackground()

    // flipScreen()
    graphics(400,400)
    originBL()
   
    t = 45
    let topleft      = random(0,360)
    let topright     = random(0,360)
    let bottomright  = random(0,360)
    let bottomleft   = random(0,360)
    
    w = (canvas.width-20) / 20
    h = (canvas.height-20) / 20
    loop = w*h

    let listgrid = new Array()
    for (let i = 0; i < loop; i++) {

        xp = i%w
        yp = i/w

        xa = ( xp ) * 20
        ya = floor( yp ) * 20

        lx = xa/w/20
        ly = ya/h/20

        a1 = lerpAngle(bottomleft, bottomright, lx)
        a2 = lerpAngle(topleft, topright, lx)
        a3 = lerpAngle(a1, a2, ly)

        // debugLog(a3)
        jitter = point0()//createPoint(random(0,5), random(0,5))
        pos = { x: xa + 20, y: ya + 20 }
        pos = addpoint(pos,jitter)


        let hashdir = (a3%90 -45) *deg

        // color('rgb(190,190,190)')
        color('coral')
        // arrowdrawing(pos, hashdir, 10)


        // rgb = 'rgb(' + a1 + ',' + a2 + ',' + a3 + ')'
        // color(rgb)
        color('gray')
        // arrowdrawing(pos, a3*deg, 19);

        color('green')
        // color('gray')
        // rectangledrawing(pos, hashdir , 10)

        listgrid.push( getRectangleObject(pos, hashdir, 10) )
    }

    // let i=0
    // debugLog(listgrid[i].location)
    // debugLog(w)
    // drawConnection(listgrid, i)
    // || i < w*(h-1)
    for (let i = 0; i < listgrid.length; i++) {
        if (i%w != w-1  && i < w* (h-1)) drawConnection(listgrid, i)
        // if (i%w == w-1  && i < w* (h-1)) drawTopConnection(listgrid, i)
        // if (i > w*(h-1) && i < w*h-1) drawSideConnection(listgrid, i)
    }

}

//-----------------------------------------

function whiteBackground(){
    color('white')
    rect(0,0, canvas.width, canvas.height)
}
function drawConnection(gridarray, i){
    // drawSideConnection(gridarray, i)
    drawTopConnection(gridarray, i)
}
function drawSideConnection(gridarray, i){
     //side
     upline1     = addpoint(gridarray[i].upright,gridarray[i].location)
     downline1   = addpoint(gridarray[i].downright,gridarray[i].location)
     upline2     = addpoint(gridarray[i+1].upleft,gridarray[i+1].location)
     downline2   = addpoint(gridarray[i+1].downleft,gridarray[i+1].location)
     color('red')
      //side contact
      line(upline1.x,upline1.y, upline2.x, upline2.y)
      line(downline1.x,downline1.y, downline2.x, downline2.y)
}
function drawTopConnection(gridarray, i){
     //top
     Lsideline1     = addpoint(gridarray[i].upright,gridarray[i].location)
     Rsideline1   = addpoint(gridarray[i].upleft,gridarray[i].location)
     Lsideline2     = addpoint(gridarray[i+1].downright,gridarray[i+w].location)
     Rsideline2   = addpoint(gridarray[i+1].downleft,gridarray[i+w].location)
      //top contact
      color('blue')
      line(Lsideline1.x,Lsideline1.y, Lsideline2.x, Lsideline2.y)
      line(Rsideline1.x,Rsideline1.y, Rsideline2.x, Rsideline2.y)
}


function originBL(){
    origin(0,canvas.height)
    flipScreen()
}

function point0(){
    return {x:0,y:0}
}
function createPoint(xp,yp){
    return {x:xp,y:yp}
}
function randomPoint(x,y, a,b){
    return {x:random(x,a),y:random(y,b)}
}
function addpoint(p1,p2){
    return {x: p1.x + p2.x, y: p1.y + p2.y }
}

function rotate(position, center, angle){
    x1 = position.x - center.x;
    y1 = position.y - center.y;
// debugLog(center.x + " : " + center.y)
    x2 = x1*cos(angle) - y1*sin(angle);
    y2 = x1*sin(angle) + y1*cos(angle);
    // x1 = x1*cos(angle) - y1*sin(angle);
    // y1 = x1*sin(angle) + y1*cos(angle);
    result = {x:x2,y:y2};
    // debugLog(result)
// debugLog(x1+" :" +y1)
    return result;
}
function rotateAngle(x,y, angle){
    x1 = x*cos(angle) - y*sin(angle);
    y1 = x*sin(angle) + y*cos(angle);
    result = {x:x1,y:y1};
    // debugLog(cos(angle)+" "+sin(angle));

    return result;
}


function arrow(position, size){
    atop     = {x:size*0.5 , y:size*1  };
    abottom  = {x:size*0.5 , y:size*0  };
    aleft    = {x:size*0   , y:size*0.5};
    aright   = {x:size*1   , y:size*0.5};

    color('red ')
    line (abottom.x + position.x,   abottom.y + position.y,     atop.x + position.x,     atop.y + position.y );
    line (  aleft.x + position.x,     aleft.y + position.y,     atop.x + position.x,     atop.y + position.y );
    color('blue')
    line ( aright.x + position.x,    aright.y + position.y,     atop.x + position.x,     atop.y + position.y );
}
function arrowdrawing(position, rotation, size){
    
    atop     = {x:0.5 , y:1  };
    abottom  = {x:0.5 , y:0  };
    aleft    = {x:0   , y:0.5};
    aright   = {x:1   , y:0.5};

    let center = { x:0.5, y:0.5 };

    atop     = rotate( atop,      center, rotation );
    abottom  = rotate( abottom,   center, rotation );
    aleft    = rotate( aleft,     center, rotation );
    aright   = rotate( aright,    center, rotation );

    atop     = {x:    atop.x * size , y:    atop.y * size };
    abottom  = {x: abottom.x * size , y: abottom.y * size };
    aleft    = {x:   aleft.x * size , y:   aleft.y * size };
    aright   = {x:  aright.x * size , y:  aright.y * size };
    
    line (abottom.x + position.x,   abottom.y + position.y,     atop.x + position.x,     atop.y + position.y );
    line (  aleft.x + position.x,     aleft.y + position.y,     atop.x + position.x,     atop.y + position.y );
    line ( aright.x + position.x,    aright.y + position.y,     atop.x + position.x,     atop.y + position.y );
    
    // debugLog(atop);

    // color('red ')
    // plot (abottom.x + position.x,   abottom.y + position.y);
    // color('orange ');
    // plot(atop.x + position.x,     atop.y + position.y );
    
    // color('yellow')
    // plot (  aleft.x + position.x,     aleft.y + position.y);
    // color('gold')
    // plot(atop.x + position.x,     atop.y + position.y );
    
    // color('blue');
    // plot ( aright.x + position.x,    aright.y + position.y);
    // color('cyan')
    // plot(    atop.x + position.x,     atop.y + position.y );
}
function rectangledrawing(position, rotation, size){
    let topleft     = {x:0 , y:1};
    let bottomleft  = {x:0 , y:0};
    let topright    = {x:1 , y:1};
    let bottomright = {x:1 , y:0};

    let center = { x:0.5, y:0.5 };

    topleft     = rotate( topleft,      center, rotation );
    bottomleft  = rotate( bottomleft,   center, rotation );
    topright    = rotate( topright,     center, rotation );
    bottomright = rotate( bottomright,  center, rotation );

    topleft     = {x: topleft.x * size,     y: topleft.y * size };
    bottomleft  = {x: bottomleft.x * size,  y: bottomleft.y * size };
    topright    = {x: topright.x * size,    y: topright.y * size };
    bottomright = {x: bottomright.x * size, y: bottomright.y * size };
    
    line ( topleft.x + position.x,   topleft.y + position.y,     bottomleft.x + position.x,     bottomleft.y + position.y );
    line ( topleft.x + position.x,     topleft.y + position.y,     topright.x + position.x,     topright.y + position.y );
    line ( bottomright.x + position.x,    bottomright.y + position.y,     topright.x + position.x,     topright.y + position.y );
    line ( bottomright.x + position.x,    bottomright.y + position.y,     bottomleft.x + position.x,     bottomleft.y + position.y );
    
}
function getRectangleObject(position, rotation, size){
    let topleft     = {x:0 , y:1};
    let bottomleft  = {x:0 , y:0};
    let topright    = {x:1 , y:1};
    let bottomright = {x:1 , y:0};

    let center = { x:0.5, y:0.5 };

    topleft     = rotate( topleft,      center, rotation );
    bottomleft  = rotate( bottomleft,   center, rotation );
    topright    = rotate( topright,     center, rotation );
    bottomright = rotate( bottomright,  center, rotation );

    topleft     = {x: topleft.x * size,     y: topleft.y * size };
    bottomleft  = {x: bottomleft.x * size,  y: bottomleft.y * size };
    topright    = {x: topright.x * size,    y: topright.y * size };
    bottomright = {x: bottomright.x * size, y: bottomright.y * size };
    
    return {upleft:topleft, downleft:bottomleft, upright:topright, downright:bottomright, location:position}
}
function createDirection(angle){
    angularline = createPoint(0,1)
    angularline = rotateAngle(angularline.x,angularline.y, angle)
    angularline= scalePoint(angularline, 45)

    midscreen = createPoint(canvas.width/2,canvas.height/2)
    target = createPoint(midscreen.x + angularline.x, midscreen.y + angularline.y)
    line (midscreen.x,midscreen.y, target.x, target.y)
}
function rectangle(x1,y1, x2,y2, solid = true){
    solid ? ctx.fillRect(x1,y1,x2-x1,y2-y1) : ctx.strokeRect(x1,y1,x2-x1,y2-y1)
}
//------------------------------------------

// function repeat(t, m) {//no clamp
//     return clamp(t - floor(t / m) * m, 0, m);
//   }

//   function lerpTheta(a, b, t) {
//     const dt = repeat(b - a, 360);
//     return lerp(a, a + (dt > 180 ? dt - 360 : dt), t);
//   }
//-------------------------------------------------
// Remaps angles into [0, 360) range on degrees.
function normalizeAngle(angle){
    return angle - floor(angle /360) * 360
}
// Returns the shortest signed angular delta
// from angle from to angle to, in degrees.
function angleDifference(from, to){
    // Wrap difference into [0, 360) range.
    difference = normalizeAngle(to-from)
    // Remap to range (-180, 180]
    // so that angles more than a half turn away
    // go via the shorter route.
    if (difference > 180) difference -=360
    // debugLog(difference)
    return difference
}

// Linearly interpolates between two angles,
// using interpolation weight blend in [0, 1].
// Return is normalized into [0, 360) range.
function lerpAngle(from, to, blend){
    difference = angleDifference(from, to)
    return normalizeAngle(from + blend * difference);
}

//----------------------------------------------