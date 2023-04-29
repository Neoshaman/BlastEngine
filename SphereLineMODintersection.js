//ray origin
spherelineinter()

function spherelineinter() {
    Origine_x = 100
    Origine_y = 100
    //ray direction normal
    Dir_x = 1
    Dir_y = 0


    //center xircle
    Center_x = 200
    Center_y = 200
    //radius
    radius = 10

    //origine to circle center
    Lx = Center_x - Origine_x
    Ly = Center_y - Origine_y

    //projection of center to ray line
    tca = Lx * Dir_x + Ly * Dir_y

    //distance to projected point
    distance = Math.sqrt((Lx * Lx + Ly * Ly) - (Lx * Dir_x + Ly * Dir_y))


    //distance from prjected center to intersection
    thc = Math.sqrt(radius * radius - distance * distance)

    //intersections
    t0 = tca - thc
    t1 = tca + thc

    console.log(t0)
}
