// import * from "./drawTools.js" -> doesn't work

//#region OLD
function Test_color(){
    color('red')
    rect(20,20, 150,100)
}

function Test_javascript_drawing(){

    graphics(400,400, 0,0)

    //rect
    ctx.lineWidth = 5;//empty rect
    ctx.strokeStyle = 'green';
    ctx.strokeRect(100,200, 150,100);
    
    //clearrect //erase a space
    ctx.clearRect(100,250, 140,90);

    //text
    ctx.font = '30px Arial';
    ctx.fillStyle = 'purple';
    ctx.fillText('Hello world', 100,50);

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'orange';
    ctx.strokeText('Hello world', 100,100);

    //path -> triangle
    ctx.beginPath()
    ctx.moveTo(50,50)//rect works without moveto
    ctx.lineTo(150,50)
    ctx.lineTo(100,200)
    ctx.fillStyle = 'coral'
    ctx.closePath(); //close the path use or ctx.fill() to make solid
    ctx.stroke()

    //arcs and circles
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    ctx.beginPath()
    //moveTo to avoid link to previous drawing
    ctx.arc(centerX,centerY, 200,0, Math.PI*2)//center - radius - start,end angle - anticlockwise bool (if true)
    ctx.stroke()

    //bezier
    cpx = 0
    cpy = 0
    x = 100
    y = 100
    ctx.quadraticCurveTo(cpx, cpy, x,y)// cp = control point, xy is target, move to to start point
    cp1x = 0
    cp1y = 0
    cp2x = 0
    cp2y = 0
    x = 0
    y = 0
    ctx.bezierCurveTo(cp1x, cp1y, cp2x,cp2y, x,y)
}
function Test_Slope(){
    x = 250  ;
    point2 = createPoint2d(x,100);// point2 = randomPoint(35,35, 100,35)
    dx1 = point2.x;
    dy1 = point2.y;
    slope1 = dx1/dy1;
    D1  = 2*dy1 - dx1

    for (let iterate_x = 0; iterate_x < point2.x; iterate_x++) {
        for (let iterate_y = 0; iterate_y < point2.y; iterate_y++) {
            slope2 = iterate_x/iterate_y;
            D2 = 2*iterate_y - iterate_x;
            // D2 = 2*iterate_y - iterate_x;
            
            relevance = (iterate_y > iterate_x);
            testSlope = (slope1 > slope2);
            testDelta = D1 > D2;
            testContradiction1 = !testSlope === true && !testDelta; //below slope but above delta
            testContradiction2 = testSlope === true && testDelta; //above slope but below delta

            //test true above (blue) and below (green)
            testSlope ? color('blue') :  color('green');
            plot(iterate_x,iterate_y);

            //test if top guaranted (black)
            if (relevance) {color('black'); plot(iterate_x,iterate_y);}

            //test if top guarantee but report below (failure)
            if (relevance && testContradiction2) {color('red');plot(iterate_x,iterate_y);}

            //test if below but fail nonetheless (failure)
            if (!relevance && testContradiction2){color('yellow');plot(iterate_x,iterate_y);}

            //test delta agreeing with slope  //below slope but above delta
            if (testContradiction1 ) {color('purple'); plot(iterate_x,iterate_y);}

        }
    }
}

function Test_animation(){
    graphics(400,400,0,0)
    //animation 
    const circle = {
        x:200,
        y: 200,
        size: 30,
        dx: 5,
        dy: 5
    }

    function drawCircle(){
        ctx.beginPath();
        ctx.arc(circle.x,circle.y, circle.size, 0, tau);
        ctx.fillStyle = 'purple';
        ctx.fill();
        //print('k')
    }

    const image = document.getElementById('source');
    const player = {//use image from the DOM
        w: 50,
        h: 70,
        x: 20,
        y: 200,
        speed: 5,
        dx: 0,
        dy: 0
    }

    function drawPlayer(){
        ctx.drawImage(image, player.x,player.y, player.w, player.h);
    }


    function newPos(){
        player.x += player.dx;
        player.y += player.dy;
    }

    function update(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        drawCircle();
        circle.x += circle.dx;
        circle.y += circle.dy;

        drawPlayer();
        newPos();

        requestAnimationFrame(update);
    }

    function moveUp(){
        player.dy = - player.speed;
    }
    function moveLeft(){
        player.dx = - player.speed;
    }
    function moveDown(){
        player.dy =   player.speed;
    }
    function moveRight(){
        player.dx =   player.speed;
    }

    function keyDown(e){
        if (e.key === 'ArrowRight' || e.key === 'Right') {//depend on browser
            moveRight();
        }else if (e.key === 'ArrowLeft' || e.key === 'Left') {
            moveLeft();
        }else if (e.key === 'ArrowUp' || e.key === 'Up') {
            moveUp();
        }else if (e.key === 'ArrowDown' || e.key === 'Down') {
            moveDown();
        }
        console.log(player.dx);
    }
    function keyUp(e){
        if (
            e.key === 'ArrowRight' ||
            e.key === 'Right' ||
            e.key === 'ArrowLeft' ||
            e.key === 'Left' ||
            e.key === 'ArrowDown' ||
            e.key === 'Down' ||
            e.key === 'ArrowUp' ||
            e.key === 'UP'
        ) {
            player.dx = 0;
            player.dy = 0;
        }
    }

    update();

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
}
//--------------------------------------
function bresenham(){
    length = random(100,400)//400 //max 400
    height = 100//random(0,100) //max 100


    dx = length;
    dy = height;
    D = 2*dy - dx
    y = 0

    xlog = 0
    D_ = 0
    color('brown')
    rect(0,0, length, height)

    for (let x = 0; x < length; x++) {
        color('black'); plot(x,y)

        debugLog(D)
        D_ = D

        if (D > 0){
            y+=1
            D-=2*dx

            // debugLog(x - xlog)
            // xlog = x
        }
        D+=2*dy
        line(x,0+70, x,70+D*0.10)
    }
}

function Angular_interpolation(){
    // Test angular interpolation

    //draw start direction
    //draw end diorection
    // loop and draw interpolated
    //lerp from start to end
    deg = tau/360
    var min = 20
    var max = random(0,359)
    var step = 10

    debugLog(min + " - " + max)
    color('green')
    for (let index = min; index <= max; index+=step) {
        t = remap01(min,max, index)
        l = lerpAngle(min, max, t)
        createDirection(l*deg)
    }
    color('red')
    createDirection(min*deg)
    color('blue')
    createDirection(max*deg)
    
}
function Flow_grid(){
    //---------------------------------------------
    //test flow grid
        //draw hash grid
        //draw random arrow in grid
        //circular hash of arrow direction

        //draw inside square in hash direction
        //connect square
    
        let deg = tau / 360
    
        // m();
        arrowGrid()
        //------------------------------------------------------
        var r = 0
        var index
        var offset = 45
        var angle

        //------------------------------------------------------
    
        function m(){
            
    
            cls();
            color('cyan');
            rect(190,40,20,20);
            color('red');
        
            // index = r % 90
            angle = r % 90 * deg - offset
        
            color('gray')
            arrowdrawing({x:200,y:50}, r * deg - offset, 20);
            color('red')
            arrowdrawing({x:200,y:50}, angle, 20);
        
            requestAnimationFrame(m);
            r += 1;
        }
       
        function arrowGrid(){

            // flipScreen()
            graphics(400,400)
            originBL()
            whiteBackground()

           
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
                gapsize = random(1,15)
                jittersize = 5

                jitter = createPoint2d(random(0,jittersize), random(0,jittersize))
                pos = { x: xa + 20, y: ya + 20 }
                pos = addpoint2d(pos,jitter)


                let hashdir = (a3%90 -45) *deg

                // color('rgb(190,190,190)')
                // color('coral')
                // arrowdrawing(pos, hashdir, 10)


                // rgb = 'rgb(' + a1 + ',' + a2 + ',' + a3 + ')'
                // color(rgb)
                // color('gray')
                // arrowdrawing(pos, a3*deg, 5);

                // color('green')
                color('gray')
                // rectangledrawing(pos, hashdir , gapsize)
                // circle(pos, gapsize/2)
                oval(pos.x,pos.y,10,5, false)

                listgrid.push( getRectangleObject(pos, hashdir, gapsize) );
              
            }

          
            for (let i = 0; i < listgrid.length; i++) {
                // if (i%w != w-1  && i < w* (h-1)) drawConnection(listgrid, i)

                // if (i%w == w-1  && i < w* (h-1)) drawTopConnection(listgrid, i)
                
                // if (i >= w*(h-1) && i < w*h-1) drawSideConnection(listgrid, i)
            }

        }
}
//#endregion

//ray origin
function wrapCasting() {
    //--------------------------------------------------------------
    //init
    // basicScreen()
    // TrackMice()
    // mice = {x:mouseX, y:mouseY}

    //--------------------------------------------------------------
    //#region OLD prototype
    // ray = normalizedVector2d({x: mouseX,y: mouseY})
    // vector2dIsNaN(ray)
    
    // Cast = {origin:{x:0,y:0},dir: ray}
    // Circle = {x:0.5, y:0.5, r:0.25}
    // scale = 100;

    //intersect();
    //visualize();

    function intersect() {
        //direction toward the circle
        Circledir = { x: Circle.x - Cast.origin.x, y: Circle.y - Cast.origin.y };

        //projection of center to ray line (dot product)
        tca = Circledir.x * Cast.dir.x + Circledir.y * Cast.dir.y;
        //distance to projected point
        cx2 = Circledir.x * Circledir.x;
        cy2 = Circledir.y * Circledir.y;
        c2 = cx2 + cy2;
        distance = sqr(c2 - tca * tca);

        //distance from projected center to intersection
        r2 = Circle.r * Circle.r;
        d2 = distance * distance;
        thc = Math.sqrt(r2 - d2);
        //intersections
        t0 = tca - thc;
        t1 = tca + thc;

        behind = (tca < 0);
        d0 = (distance < 0);
        greaterThanRadius = (r2 < d2);

        //---------------------------------------------
        perpendicular = { x: ray.x * tca, y: ray.y * tca };

        // from center TO perpendicular: perpendicular - circle center 
        p_dir = { x: perpendicular.x - Circle.x, y: perpendicular.y - Circle.y };
        p_dir = normalizedVector2d(p_dir);
    }//tca, t0[tca-thc],t1[tca+thc], perpendicular [tca*ray], p_dir[norm_perpendicular], greaterThanRadius
    //out: tca, thc, greaterThanRadius.
    //return: pdir, t1,t0, 

    function visualize() {

        plot(mouseX, mouseY);
        
        //--------------------------------------------------------------
        //ray
        color('rosybrown'); //ray to mouse
        line(mouseX, mouseY, 0, 0);
        oval(mouseX, mouseY, 2, 2, true);

        color('salmon'); //ray
        ratio = 1 / mouseY;
        inter = ratio * mouseX;
        line(inter * scale, 1 * 100, 0, 0);
        
        //--------------------------------------------------------------
        //grid
        color('gray'); //grid line
        horizontal(scale);
        color('black'); //grid line
        verticalLine(scale, 0, scale);

        //--------------------------------------------------------------
        //circle hit
        color('lightskyblue'); //circle
        oval(Circle.x * scale, Circle.y * scale, Circle.r * scale, Circle.r * scale, false);
        plot(Circle.x * scale, Circle.y * scale);

        color('red'); //ray normal direction
        line(ray.x * scale, ray.y * scale, 0, 0);

        color('yellow'); //ray distance to projection
        line(ray.x * tca * scale, ray.y * tca * scale, 0, 0);

        color('green'); //circle intersection span
        if (!greaterThanRadius) {
            line(ray.x * t0 * scale, ray.y * t0 * scale, ray.x * t1 * scale, ray.y * t1 * scale);
        }

        color('blue'); //center to projection
        line(perpendicular.x * scale, perpendicular.y * scale, Circle.x * scale, Circle.y * scale);

        color('teal'); //normal support line
        if (!greaterThanRadius) { color('red'); } //on hit
        line((Circle.x + p_dir.x) * scale, (Circle.y + p_dir.y) * scale, Circle.x * scale, Circle.y * scale);
        line((Circle.x - p_dir.x) * scale, (Circle.y - p_dir.y) * scale, Circle.x * scale, Circle.y * scale);
        //projection marker
        oval(perpendicular.x * scale, perpendicular.y * scale, 2, 2, true);

        //--------------------------------------------------------------
        //circle box
        color('lightgrey'); //extant of collisions
        //find the r on p_dir, horizontal extant
        extant1 = p_dir.y * Circle.r + Circle.y;
        extant2 = -p_dir.y * Circle.r + Circle.y;
        horizontal(extant1 * scale);
        horizontal(extant2 * scale);

        color('lightblue'); //extant box
        hitzone1 = p_dir.x * Circle.r + Circle.x;
        line(hitzone1 * scale, extant1 * scale, hitzone1 * scale, extant2 * scale);
        hitzone2 = -p_dir.x * Circle.r + Circle.x;
        line(hitzone2 * scale, extant1 * scale, hitzone2 * scale, extant2 * scale);

        //--------------------------------------------------------------
        //ray  box
        //find the ray intersection on the y limit and extants
        color('papayawhip'); //termination -> ray recurrence
        ratio = 1 / ray.y;
        inter = ratio * ray.x;
        verticalLine(inter * scale, 0, 1 * scale);

        color('DarkSalmon'); //ray box
        extant1ratio = extant1 / ray.y;
        extant1inter = extant1ratio * ray.x;
        line(extant1inter * scale, extant1 * scale, extant1inter * scale, extant2 * scale);
        extant2ratio = extant2 / ray.y;
        extant2inter = extant2ratio * ray.x;
        line(extant2inter * scale, extant1 * scale, extant2inter * scale, extant2 * scale);
    }
    //#endregion

    //--------------------------------------------------------------
    //#region refactoring:
    const GlobalStruct = {gridScale: 100, circleRadius: 0.25, circleCenter: 0.5}
    const gridOccurence = canvas.width / GlobalStruct.gridScale

    //circleData[] = {offset:i, tca:0, thc:0, normal:null, nohit:false}
    //rayData = {length:0, normal:null, occurence:0}//single value
    //raylist[] = offset (length * k) 

    //--------------------------------------------------------------
    //#region utils
   
    function horizontalIntercept(ray, height){
        //parallel, no intercept, return 0.
        if (ray.y == 0){
            return 0;
        }
        //find the ration of y component to height distance
        const ratio = height / (ray.y)

        //sure about orign? if origin.xy
            // //Otherwise, find the ratio of y component to height distance
            // const ratio = (height - origin.y) / (ray.y - origin.y);
            // //Multiply x by the ratio and add the origin x-coordinate to get the position at y height
            // return ratio * (ray.x - origin.x) + origin.x;

        //multiply x by the ratio to get the position at yheight
        return ratio * ray.x
    }

    //#endregion

    //--------------------------------------------------------------
    //#region ray
    let rayData// = {length:0, normal:null, occurence:0}//single value
    let raylist = []

    const getVector2d = (origin2d, end2d) =>{
        vector2d = subpoint2d(end2d, origin2d)
        return vector2dIsNaN(vector2d)
    }

    function getNormal(vector2d){
        ray = normalizedVector2d(vector2d)
        return vector2dIsNaN(ray)
    }

    function getWrappedRayLength(ray){
        //ray at origin, return length
        return horizontalIntercept(ray, 1)
        //if ray not at origin, still compute intercept as if origin
        //but find delta by using the pos.y, then find -x to get start offset
    }

    //----

    function getRayData(mice){
        const origin = {x:0,y:0}
        const ray = getVector2d(origin, mice)

        //raydata
        const length = getWrappedRayLength(ray)
        const normal = getNormal(ray)
        const occurence = canvas.width / length * GlobalStruct.gridScale

        rayData = {length, normal, occurence}
    }

    function generateRayList(){
        getRayData(mice)

        if (rayData.occurence > 1 &&rayData.occurence < 100){
            for (let i = 0; i < rayData.occurence; i++) {
                raylist[i] = rayData.length*i;
            }
        }
    }
    //#endregion

    //--------------------------------------------------------------
    //#region circle

    let circlelist = []

    function getCircleList(){
        //for every occurence of raylist,
            //iterate all possible circle within that range
            //for 

        for (let i = 0; i < gridOccurence; i++)
        {
            circlelist[i] = {offset:i, tca:0, thc:0, normal:null, nohit:false}
        }
    }
    //#endregion

    //--------------------------------------------------------------
    //#region intersection
    let collisionData = {extants:null, raybox:null, circlebox:null}

    function lineCircleInter(dir, rayOffset, circleOffset){
        origin = {x:rayOffset,y:0} //+ ray offset

        position = GlobalStruct.circleCenter +circleOffset
        radius = GlobalStruct.circleRadius

        Circle = {x:position, y:position, r:radius}
        //---------------------------------------------
        //direction from origin to circle center
        Circledir = {x: Circle.x - origin.x, y: Circle.y - origin.y}
        //projection of center to ray line (dot product)
        projection = Circledir.x * dir.x + Circledir.y * dir.y
    
        //distance to projected point
        cx2 = Circledir.x * Circledir.x
        cy2 = Circledir.y * Circledir.y
        c2 = cx2 + cy2
        distance = sqr(c2 - projection*projection)

        //distance from projected center to intersection
        r2 = Circle.r * Circle.r
        d2 = distance * distance
        thc = Math.sqrt(r2 - d2)

        //intersections
        intersection1 = projection - thc
        intersection2 = projection + thc

        //bool test
        //behind =  (projection < 0)
        greaterThanRadius = (r2 < d2)

        //---------------------------------------------
        perpendicular = {x: ray.x*projection, y: ray.y*projection}

        // from center point TO perpendicular point: perpendicular - circle center 
        p_dir = {x:perpendicular.x-Circle.x, y:perpendicular.y-Circle.y}
        p_dir = normalizedVector2d(p_dir)

        return {tca:projection, thc:thc, greaterThanRadius:greaterThanRadius, p_dir:p_dir}
    }

    function firstHit(){
        //first ray vs first circle
        const hitdata = lineCircleInter(rayData.normal, 0, circlelist[0].offset)
        getCollisionData(hitdata)

        circlelist[0].tca = hitdata.tca
        circlelist[0].thc = hitdata.thc
        circlelist[0].normal = hitdata.p_dir
        circlelist[0].nohit = hitdata.greaterThanRadius
    }

    function emptyskipHit(){}
    function fallThroughHit(){}
    function allHit(){}//debg draw

    function resolveCollision(){
        generateRayList()
        //--
        firstHit()
        emptyskipHit()
        fallThroughHit()
    }

    //find the boxes (circle and ray)
    function getCollisionData(hitdata){

        const position = GlobalStruct.circleCenter
        const radius = GlobalStruct.circleRadius

        //box y
        const extant1 = hitdata.p_dir.y * radius + position;
        const extant2 = -hitdata.p_dir.y * radius + position;

        //circle box x
        const hitzone1 = hitdata.p_dir.x * radius + position;
        const hitzone2 = -hitdata.p_dir.x * radius + position;

         //ray box x
        const extant1inter = horizontalIntercept(ray, extant1)
        const extant2inter = horizontalIntercept(ray, extant2)

        //collisionData
        collisionData.extants = {y1:extant1, y2:extant2}
        collisionData.circlebox = {x1:hitzone1, x2:hitzone2}
        collisionData.raybox = {x1:extant1inter, x2:extant2inter}
    }

    function rayCircleOverlap(){
        //ray length vs circle size, how many circle per ray interval?
        //for ray offet to +length,
            //if circle within range, overlap
            //what about double overlap?

    }
    //#endregion

    //--------------------------------------------------------------
    //#region drawing
    function drawMiceLine(){
        color('rosybrown');
        line(mice.x, mice.y, 0, 0);
        drawdot(mice);
    }
    
    function drawRay(){
        color('salmon')
        const inter = horizontalIntercept(mice,1)
        line(inter * GlobalStruct.gridScale, 1 * 100, 0, 0)
    }

    function drawCircle(offset)
    {
        const scale = GlobalStruct.gridScale
        const radius = GlobalStruct.circleRadius
        const center = {x:GlobalStruct.circleCenter +offset, y:GlobalStruct.circleCenter}
        const Scalecenter = {x:center.x *scale, y:center.y *scale}

        color('lightskyblue')
        circle(Scalecenter, radius*scale)
        plot(Scalecenter.x, Scalecenter.y)
    }

    function drawdot(position){
        circle(position, 2, true)
    }
    //----

    function drawCircleRow()
    {
        //loop circledata instead
        //for each circledata
        circlelist.forEach(element => {
            color('lightskyblue')
            drawCircle(element.offset)
        })
    }

    function drawGridRow()
    {    
        color('lightgrey')//('gray'); //grid line
        horizontal(GlobalStruct.gridScale);

        for (let i = 0; i < gridOccurence; i++) {
            color('lightgrey')//('black'); //grid line
            verticalLine(GlobalStruct.gridScale*i, 0, GlobalStruct.gridScale);
        }
    }
    //function drawRayrow()-> screen width

    //function intersectRow()-> 

    //generate ray intercept
    //ceil? canvas width / ray intercept * scale

    //----

    // color('red'); //ray normal direction
    // line(ray.x * scale, ray.y * scale, 0, 0);

    // color('yellow'); //origin to projection
    // line(ray.x * tca * scale, ray.y * tca * scale, 0, 0);

    // color('blue'); //from center to projection
    // line(perpendicular.x * scale, perpendicular.y * scale, Circle.x * scale, Circle.y * scale);

    //----

    //------ circleData[] = {offset:i, tca:0, thc:0, normal:null, nohit:false}
    //------ rayData = {length:0, normal:null, occurence:0}//single value

    //----

    function drawIntersectionSpan(circle){

         color('green');
         const k = (circle.offset+1)

         const t0 = (circle.tca - circle.thc) * k
         const t1 = (circle.tca + circle.thc) * k
         const ray = rayData.normal
         const scale = GlobalStruct.gridScale

         if (!circle.nohit) {
             line(ray.x * t0 * scale, ray.y * t0 * scale, ray.x * t1 * scale, ray.y * t1 * scale);
         }
    }

    function drawIntersectionDot(circle){
        const dot = {x:(perpendicular.x + circle.offset)*GlobalStruct.gridScale, y:(perpendicular.y)*GlobalStruct.gridScale}     
        drawdot(dot);
    }

    function drawPerpendicular(circle){
        const p_dir = circle.normal
        const scale = GlobalStruct.gridScale
        const Circle = {x:GlobalStruct.circleCenter + circle.offset, y:GlobalStruct.circleCenter}
        
        color('teal');if (!circle.nohit) { color('red'); } //on hit
        line((Circle.x + p_dir.x) * scale, (Circle.y + p_dir.y) * scale, Circle.x * scale, Circle.y * scale);
        line((Circle.x - p_dir.x) * scale, (Circle.y - p_dir.y) * scale, Circle.x * scale, Circle.y * scale);
    }

    //----
   
    function drawExtants(){
        color('lightgrey')
        const scale = GlobalStruct.gridScale
        const y1 = collisionData.extants.y1
        const y2 = collisionData.extants.y2

        horizontal(y1 *scale)
        horizontal(y2 *scale)
    }
    function drawCircleBox(offset){
        color('lightblue')
        const scale = GlobalStruct.gridScale
        const x1 = collisionData.circlebox.x1
        const x2 = collisionData.circlebox.x2
        const y1 = collisionData.extants.y1
        const y2 = collisionData.extants.y2

        verticalLine(x1 *scale, y1 *scale, y2 *scale)
        verticalLine(x2 *scale, y1 *scale, y2 *scale)
    }

    function drawRayBox(offset){
        color('DarkSalmon')
        const scale = GlobalStruct.gridScale
        const x1 = collisionData.raybox.x1
        const x2 = collisionData.raybox.x2
        const y1 = collisionData.extants.y1
        const y2 = collisionData.extants.y2

        verticalLine(x1 *scale, y1 *scale, y2 *scale)
        verticalLine(x2 *scale, y1 *scale, y2 *scale)
    }

    function drawBoxes(){
        drawExtants()

        //draw as rows
        drawCircleBox()
        drawRayBox()
    }

    //----
    function drawFirstHit(){
        drawIntersectionSpan(circlelist[0], 0)
        drawIntersectionDot(circlelist[0])
        drawPerpendicular(circlelist[0])
    }

    //----

    function drawHitResolve(){
       drawFirstHit()
       drawBoxes()
       //other
    }
    //#endregion

    //--------------------------------------------------------------
    //#region lifecycle
    function init(){
        getCircleList()

        //-> generate intersection hit
        //from collision data from firstHit
    }
    function input(){
        TrackMice()
    }
    function draw(){
        drawCircleRow()
        drawMiceLine()
        drawRay()//-> draw ray row
        drawGridRow()

        //draw intersection resolve from hit data
        drawHitResolve()
    }
    function flush(){
        //flush the array and memory each frame! possible?
        //clear the array
        raylist = []
        circlelist = []
    }
    //#endregion

    //#region system

    ////operate only once
    //system operation to move out from this
    let GlobalStart = false

    function start(){
        init()
    }
    function update(){
        basicScreen()
        input()
        resolveCollision()
    }
    function render(){
        draw()
    }

    function main(){
        start()

        // if (!GlobalStart) {
        //     start()
        //     GlobalStart = true
        // }
        update()
        render()
        flush()
    }

    return main
    
    //#endregion

    //#endregion
}