// -----draw tools

//shape2d
function circle(center2d, radius, solid=false){
    ctx.beginPath()
    ctx.arc(center2d.x,center2d.y, radius,0, tau)
    //center - radius - start,end angle - anticlockwise bool (if true)
    //ctx.stroke()
    solid ? ctx.fill() : ctx.stroke()
}
function arrow(position2d, size){
    atop     = {x:size*0.5 , y:size*1  };
    abottom  = {x:size*0.5 , y:size*0  };
    aleft    = {x:size*0   , y:size*0.5};
    aright   = {x:size*1   , y:size*0.5};

    color('red ')
    line (abottom.x + position2d.x,   abottom.y + position2d.y,     atop.x + position2d.x,     atop.y + position2d.y );
    line (  aleft.x + position2d.x,     aleft.y + position2d.y,     atop.x + position2d.x,     atop.y + position2d.y );
    color('blue')
    line ( aright.x + position2d.x,    aright.y + position2d.y,     atop.x + position2d.x,     atop.y + position2d.y );
}
function arrowdrawing(position2d, rotation, size){
    
    atop     = {x:0.5 , y:1  };
    abottom  = {x:0.5 , y:0  };
    aleft    = {x:0   , y:0.5};
    aright   = {x:1   , y:0.5};

    let center = { x:0.5, y:0.5 };

    atop     = rotate2d( atop,      center, rotation );
    abottom  = rotate2d( abottom,   center, rotation );
    aleft    = rotate2d( aleft,     center, rotation );
    aright   = rotate2d( aright,    center, rotation );

    atop     = {x:    atop.x * size , y:    atop.y * size };
    abottom  = {x: abottom.x * size , y: abottom.y * size };
    aleft    = {x:   aleft.x * size , y:   aleft.y * size };
    aright   = {x:  aright.x * size , y:  aright.y * size };
    
    line (abottom.x + position2d.x,   abottom.y + position2d.y,     atop.x + position2d.x,     atop.y + position2d.y );
    line (  aleft.x + position2d.x,     aleft.y + position2d.y,     atop.x + position2d.x,     atop.y + position2d.y );
    line ( aright.x + position2d.x,    aright.y + position2d.y,     atop.x + position2d.x,     atop.y + position2d.y );
    
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
function rectangledrawing(position2d, rotation, size){
    let topleft     = {x:0 , y:1};
    let bottomleft  = {x:0 , y:0};
    let topright    = {x:1 , y:1};
    let bottomright = {x:1 , y:0};

    let center = { x:0.5, y:0.5 };

    topleft     = rotate2d( topleft,      center, rotation );
    bottomleft  = rotate2d( bottomleft,   center, rotation );
    topright    = rotate2d( topright,     center, rotation );
    bottomright = rotate2d( bottomright,  center, rotation );

    topleft     = {x: topleft.x * size,     y: topleft.y * size };
    bottomleft  = {x: bottomleft.x * size,  y: bottomleft.y * size };
    topright    = {x: topright.x * size,    y: topright.y * size };
    bottomright = {x: bottomright.x * size, y: bottomright.y * size };
    
    line ( topleft.x + position2d.x,   topleft.y + position2d.y,     bottomleft.x + position2d.x,     bottomleft.y + position2d.y );
    line ( topleft.x + position2d.x,     topleft.y + position2d.y,     topright.x + position2d.x,     topright.y + position2d.y );
    line ( bottomright.x + position2d.x,    bottomright.y + position2d.y,     topright.x + position2d.x,     topright.y + position2d.y );
    line ( bottomright.x + position2d.x,    bottomright.y + position2d.y,     bottomleft.x + position2d.x,     bottomleft.y + position2d.y );
    
}
function getRectangleObject(position2d, rotation, size){
    let topleft     = {x:0 , y:1};
    let bottomleft  = {x:0 , y:0};
    let topright    = {x:1 , y:1};
    let bottomright = {x:1 , y:0};

    let center = { x:0.5, y:0.5 };

    topleft     = rotate2d( topleft,      center, rotation );
    bottomleft  = rotate2d( bottomleft,   center, rotation );
    topright    = rotate2d( topright,     center, rotation );
    bottomright = rotate2d( bottomright,  center, rotation );

    topleft     = {x: topleft.x * size,     y: topleft.y * size };
    bottomleft  = {x: bottomleft.x * size,  y: bottomleft.y * size };
    topright    = {x: topright.x * size,    y: topright.y * size };
    bottomright = {x: bottomright.x * size, y: bottomright.y * size };
    
    return {upleft:topleft, downleft:bottomleft, upright:topright, downright:bottomright, location:position2d}
}
function createDirection(angle){
    angularline = createPoint2d(0,1)
    angularline = rotateAngle(angularline.x,angularline.y, angle)
    angularline= scalePoint2d(angularline, 45)

    midscreen = createPoint2d(canvas.width/2,canvas.height/2)
    target = createPoint2d(midscreen.x + angularline.x, midscreen.y + angularline.y)
    line (midscreen.x,midscreen.y, target.x, target.y)
}
function rectangle(x1,y1, x2,y2, solid = true){
    solid ? ctx.fillRect(x1,y1,x2-x1,y2-y1) : ctx.strokeRect(x1,y1,x2-x1,y2-y1)
}
function square(x1,x2,size){
    ctx.fillRect(x1,y1,size,size)
}
function whiteBackground(){
    color('white')
    rect(0,0, canvas.width, canvas.height)
}
function drawConnection(gridarray, i){
    drawSideConnection(gridarray, i)
    drawTopConnection(gridarray, i)
}
function drawSideConnection(gridarray, i){
     //side
     upline1     = addpoint2d(gridarray[i].upright,  gridarray[i].location)
     downline1   = addpoint2d(gridarray[i].downright,gridarray[i].location)
     upline2     = addpoint2d(gridarray[i+1].upleft,   gridarray[i+1].location)
     downline2   = addpoint2d(gridarray[i+1].downleft, gridarray[i+1].location)
     color('red')
      //side contact
      line(upline1.x,upline1.y,     upline2.x, upline2.y)
      line(downline1.x,downline1.y, downline2.x, downline2.y)
}
function drawTopConnection(gridarray, i){
     //top
     Lsideline1   = addpoint2d(gridarray[i].upright,  gridarray[i].location)
     Rsideline1   = addpoint2d(gridarray[i].upleft,   gridarray[i].location)
     Lsideline2   = addpoint2d(gridarray[i+w].downright,gridarray[i+w].location)
     Rsideline2   = addpoint2d(gridarray[i+w].downleft, gridarray[i+w].location)
      //top contact
      color('blue')
      line(Lsideline1.x,Lsideline1.y, Lsideline2.x, Lsideline2.y)
      line(Rsideline1.x,Rsideline1.y, Rsideline2.x, Rsideline2.y)
}
function horizontal(height){
    line(0,height,canvas.width,height)
}
function vertical(width){
    line(width,0,width,canvas.height)
}
function verticalLine(x, height1, height2){
    line (x, height1, x, height2)
}
function horizontalLine(y, width1, width2){
    line (width1, y, width2, y)
}



//----- math tools-----------------------------------------------

//point2d
function point0(){
    return {x:0,y:0}
}
function createPoint2d(xp,yp){
    return {x:xp,y:yp}
}
function randomPoint2d(x,y, a,b){
    return {x:random(x,a),y:random(y,b)}
}
function scalePoint2d(point2d, scale){
    return {x:point2d.x * scale, y:point2d.y * scale}
}
function addpoint2d(p1,p2){
    return {x: p1.x + p2.x, y: p1.y + p2.y }
}
function subpoint2d(p1,p2){
    return {x: p1.x - p2.x, y: p1.y - p2.y }
}
//vector2d
function vector2dIsNaN(vector2d){
    if ( isNaN(vector2d.x) || isNaN(vector2d.y)){
        vector2d = {x:1,y:0}
        debugLog("vector2d is NaN")
    }
    return vector2d
}
function rotate2d(position2d, center2d, angle){
    x1 = position2d.x - center2d.x;
    y1 = position2d.y - center2d.y;
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

//******************** */
function shortest_angle(end, start){
    return ((((end - start) % 360) + 540) % 360) - 180;
    // return shortest_angle// -* amount;
}


//----------------------------------
function lerp(value1, value2, t){
    return value1 + (value2 - value1) * t
}

function lerphannah(b,a,t){
    if (abs(a - 360 - b)<(abs(a)-b)){a = a-360}
    return b = b + (a-b)*t
}

function lerpgbadev(a1, a2){
    a1 = abs(a1)
    a2 = abs(a2)
    if (a1 < a2){ as = a1; a1 =a2; a2=as;}
    ad = a1 - a2
    return ad < 180 ? ad / 2 : (ad + 360) /2
}

function lerpwrap(start, end, amount){
    short = ( ((((end - start)%360)+540)%360)-180)
    return start + ( short  * amount)%360
}

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

function lerpHades(from, to, blend){
    difference = angleDifference(from, to)
    return normalizeAngle(from + sgn(from-to) *blend * difference);
}

//----------------------------

//-----------------------------------------
function contrainAngle360(angle){
    return (angle %360 +360) %360
}

function contrainToffModulo(number, modulo){
    return (number%modulo +modulo)%modulo
}
function remap (x, t1,t2, s1,s2){// remap interval t into s
    r1 = (x-t1)/(t2-t1)
    r2 = r1*(s2-s1)+s1
    return r2
}
function remap01 (t1,t2,x){// remap interval t into s
    return (x-t1)/(t2-t1)// remap(x, t1,t2, 0,1)
}


