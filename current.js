
//ray origin
function wrapCasting() {
    //--------------------------------------------------------------
    //#region refactoring:
    const GlobalStruct = {gridScale: 100, circleRadius: 0.25, circleCenter: 0.5}
    const gridOccurence = canvas.width / GlobalStruct.gridScale

    //circleData[] = {offset:i, tca:0, thc:0, normal:null, hit:false}
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
    let raylist = [] //probably don't need that because occurence * length does the trick
    const MAXrayOccurence = gridOccurence

    function getVector2d (origin2d, end2d){
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
        const l = getWrappedRayLength(ray)
        const length = l > 0 ? l : 1000
        const normal = getNormal(ray)
        const occurence = floor(canvas.width / (length * GlobalStruct.gridScale))

        rayData = {length, normal, occurence}
    }

    function generateRayList(){
        getRayData(mice)

        if (rayData.occurence > 1 &&rayData.occurence < MAXrayOccurence){
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
            circlelist[i] = {offset:i}
        }
    }
    //#endregion

    //--------------------------------------------------------------
    //#region intersection
    let collisionData = {extants:null, raybox:null, circlebox:null, p_dir:null}
    let hitlist = []//circle index, tca, thc, hit
    let fastHitList = []

    function lineCircleInter(dir, rayOffset, circleOffset){

        const origin = {x:rayOffset,y:0}

        const position = GlobalStruct.circleCenter
        const radius = GlobalStruct.circleRadius

        const Circle = {x:position+circleOffset, y:position, r:radius}

        //---------------------------------------------
        //direction from origin to circle center
        const Circledir = {x: Circle.x - origin.x, y: Circle.y - origin.y}
        //projection of center to ray line (dot product)
        const projection = Circledir.x * dir.x + Circledir.y * dir.y
        
        scale = GlobalStruct.scale

        //---------------------------------------------

        //distance to projected point
        const cx2 = Circledir.x * Circledir.x
        const cy2 = Circledir.y * Circledir.y
        const c2 = cx2 + cy2

        // const distance = sqr(c2 - projection*projection)
        // const d2 = distance * distance
        const p2 = projection * projection
        const d2 = abs(c2 - p2)

        // const distance = sqr(d2)

        //distance from projected center to intersection
        const r2 = abs(Circle.r * Circle.r)
        const thc = sqr(abs(r2 - d2))

        // //intersections
        // const intersection1 = projection - thc
        // const intersection2 = projection + thc

        //bool test
        //behind =  (projection < 0)
        const hit = r2 > d2

        //---------------------------------------------
        // perpendicular = {x: ray.x*projection, y: ray.y*projection}
        const perpendicular = {x: dir.x*projection, y: dir.y*projection}

        // from center point TO perpendicular point: perpendicular - circle center 
        // let p_dir = {x:perpendicular.x-Circle.x, y:perpendicular.y-Circle.y}
        const p_dir = normalizedVector2d({x:perpendicular.x-Circle.x, y:perpendicular.y-Circle.y})

        // color('black')
        // line(origin.x *scale, origin.y*scale, Circledir.x*scale, Circledir.y*scale)
        
        return {projection:projection, thc:thc, hit:hit, p_dir:p_dir}
    }

    //find the boxes (circle and ray)
    function getCollisionData(normal){

        const position = GlobalStruct.circleCenter
        const radius = GlobalStruct.circleRadius

        //box y
        const extant1 = -normal.y * radius + position;
        const extant2 =  normal.y * radius + position;

        //circle box x
        const hitzone1 = -normal.x * radius + position;
        const hitzone2 =  normal.x * radius + position;

         //ray box x
        const extant1inter = horizontalIntercept(ray, extant1)
        const extant2inter = horizontalIntercept(ray, extant2)

        //collisionData
        collisionData.extants = {y1:extant1, y2:extant2}
        collisionData.circlebox = {x1:hitzone1, x2:hitzone2}
        collisionData.raybox = {x1:extant1inter, x2:extant2inter}
        collisionData.p_dir = normal
        
    }

    function getHit(circleIndex, rayoffset){
        const hitdata = lineCircleInter(rayData.normal, rayoffset, circlelist[circleIndex].offset)
        return {index:circleIndex, projection:hitdata.projection, thc:hitdata.thc, hit: hitdata.hit, p_dir: hitdata.p_dir}
    }

    //--------

    function allHit(){
        //for each ray, define from to: for each ray occurence
            //hash = position / hash size
            //from = hash ray start to grid
            //to = hash ray end (start + length) to grid

        hitlist.length = 0
        const limit = rayData.occurence < MAXrayOccurence

        for (let loop = 0; loop <= rayData.occurence &&limit ; loop++) {

            //could probably generalize to hashsize instead of integer /1 implicit
            const raypos = (loop * rayData.length)
            const from = floor(raypos)
            const to = floor(raypos + rayData.length)

            //loop circles for from to
                //add circle check to hitlist
                //---->>> verify teh input of the loop if it doesn't exceed circlelist
            for (let iteration = from; iteration <= to && iteration < circlelist.length; iteration++) {
                const data = getHit(iteration, raypos)
                const circleHit = {index:data.index, projection:data.projection, thc:data.thc, hit: data.hit, raypos: raypos}
                hitlist.push(circleHit)
            }
        }
    }
    //function spatial hash (number, hash): floor(number/hash) or number % hash?

    function firstHit(){
        fastHitList.length = 0
        //first ray vs first circle
        const data = getHit(0,0)
        getCollisionData(data.p_dir)
        fastHitList.push(data)
    }

    function emptyskipHit(){
        //find intercept at first extants
            //-> done with collision raybox on first hit
            //check overlap with circle boxes
                //integer check?
                //how many box ovelap?
                    //hash start and end of raybox?
                        //add box size together to find length
                        //substract 0.5 to snap to integer
                        //substract start point to raybox to snap to 0
                        //ceil start, floor end?
                        //length = number of overlap?
                        //return circle list for registration
    }

    function fallThroughHit(){}

    function FastHit(){
        firstHit()
        emptyskipHit()
        fallThroughHit()
        //return the first hit
    }

    function resolveCollision(){
        generateRayList()
        //-- verify adequation with new method
        firstHit()
        allHit()

        //new method
        // FastHit()       
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

    function drawMarker(position){
        circle(position, 4, false)
    }
    //----

    function drawCircleRow()
    {
        //loop circledata instead
        //for each circledata
        circlelist.forEach(circles => {
            color('lightskyblue')
            drawCircle(circles.offset)
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
    
    function drawRayRow(){
        for (let loop = 1; loop <= rayData.occurence; loop++) {

            if (loop > 100) return


            const scale = GlobalStruct.gridScale
            const length = rayData.length

            const start = (loop * length)
            const end = (start + length)
            color("yellow")
            line(start * scale, 0, end * scale, 1*scale)
        }
    }

    //----

    // color('red'); //ray normal direction
    // line(ray.x * scale, ray.y * scale, 0, 0);

    // color('yellow'); //origin to projection
    // line(ray.x * tca * scale, ray.y * tca * scale, 0, 0);

    // color('blue'); //from center to projection
    // line(perpendicular.x * scale, perpendicular.y * scale, Circle.x * scale, Circle.y * scale);

    //----

    function drawIntersectionSpan(hitdata){

        color('green');
        const circles = circlelist[hitdata.index]
        //const k = 1//(circles.offset+1)//from circle yes, get index from hitlist

        const t0 = (hitdata.projection - hitdata.thc)// * k
        const t1 = (hitdata.projection + hitdata.thc)// * k

        const ray   = rayData.normal
        const scale = GlobalStruct.gridScale
        const pos   = hitdata.raypos

        const start = {x: ray.x*t0, y: ray.y*t0}
        const end   = {x: ray.x*t1, y: ray.y*t1}

        if (hitdata.hit) {
            line((start.x + pos) * scale, start.y * scale, (end.x +pos) * scale, end.y * scale);
        }
    }

    function drawIntersectionDot(hitdata){
        const circles = circlelist[hitdata.index]
        const center = GlobalStruct.circleCenter

        const p = hitdata.projection

        const ray = rayData.normal
        const scale = GlobalStruct.gridScale
        const pos   = hitdata.raypos

        const position = {x: pos + ray.x*p, y: ray.y*p}

        const dot = {x: position.x *scale, y: position.y *scale}

        !hitdata.hit ? color('teal') : color('red')
        drawdot(dot);
    }

    function drawPerpendicular(hitdata){
       
        const circles = circlelist[hitdata.index]
        const p_dir = collisionData.p_dir
        const scale = GlobalStruct.gridScale
        const Circle = {x:GlobalStruct.circleCenter + circles.offset, y:GlobalStruct.circleCenter}
        
        color('lightgrey')
        line((Circle.x + p_dir.x) *scale, (Circle.y + p_dir.y) *scale, Circle.x *scale, Circle.y *scale);
        line((Circle.x - p_dir.x) *scale, (Circle.y - p_dir.y) *scale, Circle.x *scale, Circle.y *scale);
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
        color('aquamarine')
        const scale = GlobalStruct.gridScale
        const x1 = collisionData.circlebox.x1 +offset
        const x2 = collisionData.circlebox.x2 +offset
        const y1 = collisionData.extants.y1
        const y2 = collisionData.extants.y2

        verticalLine(x1 *scale, y1 *scale, y2 *scale)
        verticalLine(x2 *scale, y1 *scale, y2 *scale)
        rectangle(x1*scale,y1*scale, x2*scale,y2*scale)
    }

    function drawRayBox(offset){
        color('DarkSalmon')
        const scale = GlobalStruct.gridScale
        const x1 = collisionData.raybox.x1 +offset
        const x2 = collisionData.raybox.x2 +offset
        const y1 = collisionData.extants.y1
        const y2 = collisionData.extants.y2

        verticalLine(x1 *scale, y1 *scale, y2 *scale)
        verticalLine(x2 *scale, y1 *scale, y2 *scale)
        rectangle(x1*scale,y1*scale, x2*scale,y2*scale)
    }

    function drawBoxes(){
        drawExtants()

        //for each circles
        circlelist.forEach(circles => {
            drawCircleBox(circles.offset)
        })

        //for each rays
        for (let loop = 0; loop <= rayData.occurence; loop++) {
            if (loop > 100) return

            const length = rayData.length
            const start = (loop * length)

            drawRayBox(start)
        }
    }

    //----
    function drawHits(index){
        drawIntersectionSpan(hitlist[index])
        drawIntersectionDot(hitlist[index])
        drawPerpendicular(hitlist[index])
    }

    function drawFastHits(){
        //loop fastHitList
            //draw markers
    }

    function drawAllHits(){
        for (let item = 0; item < hitlist.length; item++) {
            drawHits(item)
        }
    }

    //----

    function drawHitResolve(){
        drawBoxes()
        drawRayRow()
        drawAllHits()
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
    function flush(){//altered for debug
        //flush the array and memory each frame! possible?
        //clear the array
        raylist = []
        circlelist = []
        hitList = []
        fastHitList = []

        raylist.length = 0
        circlelist.length = 0
        // hitlist.length = 0
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

    //--------------------
    
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

    // // debug drawing
    // function debugTEST(){
    //     basicScreen()
    //     color("black")
    //     line(0,0, canvas.width+100,100)
    // }

    // return debugTEST()

    return main

    //#endregion

    //#endregion
}