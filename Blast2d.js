//blast engine 2d and 3d
INTERNAL_SEED = 0 //TODO: seeded random
//https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript

// blitz3d documentation 2d
// https://kippykip.com/b3ddocs/commands/index.htm

//#region Math
//     Pi
const tau = Math.PI*2;
const pi  = Math.PI;

//     Int
//     Float

//     Floor
function floor(number){
    return Math.floor(number)
}
//     Ceil
function ceil(number){
    return Math.ceil(number)
}
//     Sgn
function sgn(number){
    return Math.sign(number)
}
//     Abs
function abs(number){
    return Math.abs(number)
}
//     Mod
function mod(number, div){
    return a % div
}
//     Sqr
function sqr(number){
    return Math.sqrt(number)
}
//     Sin
function sin(number){
    return Math.sin(number)
}
//     Cos
function cos(number){
    return Math.cos(number)
}
//     Tan
function tan(number){
    return Math.tan(number)
}
//     ASin
function asin(number){
    return Math.asin(number)
}
//     ACos
function acos(number){
    return Math.acos(number)
}
//     ATan
function atan(number){
    return Math.atan(number)
}
//     ATan2
function atan2(number){
    return Math.atan2(number)
}
//     Exp
function exp(number){
    return Math.exp(number)
}
//     Log
function log(number){
    return Math.log(number)
}
//     Log10
function log10(number){
    return Math.log10(number)
}
//     Xor
function xor(number, operand){
    return number ^ operand
}
//     Shl
function shl(number, operand){
    return number << operand //Shifts left by pushing zeros in from the right and let the leftmost bits fall off
}
//     Shr
function shr(number, operand){
    return number >>> operand //Shifts right by pushing zeros in from the left, and let the rightmost bits fall off

}
//     Sar
function sar(number, operand){
    return number >> operand //Shifts right by pushing copies of the leftmost bit in from the left, and let the rightmost bits fall off
}

//     Rnd
function random (a,b){
    return a + Math.random()* (b-a)
}
function rnd(start, end){//floating point
    return random(start, end)
}

//     Rand
function rand(number){//integer
    return random(start, end)
}
//     SeedRnd
function seedRnd(a){
    return a
}
//     RndSeed
function rndSeed(a){
    return a
}
//#endregion 

//#region String
//     Str
//     Left
//     Right
//     Mid

//     Replace
//     Instr

//     Upper
//     Lower

//     Trim
//     LSet
//     RSet

//     Chr
//     Asc
//     Len
//     Hex
//     Bin
//     String
//#endregion

//#region Text
    // Print
    // Write
    // Locate
    // Text

    // LoadFont
    // SetFont
    // FreeFont
    // FontWidth
    // FontHeight

    // StringWidth
    // StringHeight
//#endregion

//#region Input
    // Input

    // KeyDown
    // KeyHit
    // GetKey
    // WaitKey
    // FlushKeys

    // MoveMouse
    // MouseDown
    // MouseHit
    // GetMouse
    // WaitMouse

    // MouseX
    // MouseY
    // MouseZ
    // MouseXSpeed
    // MouseYSpeed
    // MouseZSpeed
    // FlushMouse

    // JoyType
    // JoyDown
    // JoyHit
    // GetJoy
    // WaitJoy

    // JoyX
    // JoyY
    // JoyZ
    // JoyU
    // JoyV
    // JoyXDir
    // JoyYDir
    // JoyZDir
    // JoyUDir
    // JoyVDir
    // JoyYaw
    // JoyPitch
    // JoyRoll
    // JoyHat
    // FlushJoy
//#endregion

//#region Bank
    // CreateBank
    // FreeBank
    // BankSize
    // ResizeBank
    // CopyBank

    // PeekByte
    // PeekShort
    // PeekInt
    // PeekFloat

    // PokeByte
    // PokeShort
    // PokeInt
    // PokeFloat
//#endregion

//#region File
    // OpenFile
    // ReadFile
    // WriteFile
    // CloseFile

    // FilePos
    // SeekFile

    // ReadDir
    // CloseDir
    // NextFile
    // CurrentDir
    // ChangeDir
    // CreateDir
    // DeleteDir

    // FileType
    // FileSize

    // CopyFile
    // DeleteFile
//#endregion

//#region File/Stream
//     Eof

//     ReadAvail
//     ReadByte
//     ReadShort
//     ReadInt
//     ReadFloat
//     ReadString
//     ReadLine
//     ReadBytes

//     WriteByte
//     WriteShort
//     WriteInt
//     WriteFloat
//     WriteString
//     WriteLine
//     WriteBytes
//#endregion

//#region Network
    // CountHostIPs
    // HostIP
    // DottedIP
    // CopyStream
//#endregion

//#region TCP (Network)
    // OpenTCPStream
    // CloseTCPStream

    // CreateTCPServer
    // AcceptTCPStream
    // CloseTCPServer

    // TCPStreamIP
    // TCPStreamPort
    // TCPTimeouts
//#endregion

//#region UDP (Network)
//     CreateUDPStream
//     CloseUDPStream
//     SendUDPMsg
//     RecvUDPMsg
//     UDPStreamIP
//     UDPStreamPort
//     UDPMsgIP
//     UDPMsgPort
//     UDPTimeouts
//#endregion

//#region DirectPlay
//     StartNetGame
//     HostNetGame
//     JoinNetGame
//     StopNetGame

//     CreateNetPlayer
//     DeleteNetPlayer
//     NetPlayerName
//     NetPlayerLocal

//     RecvNetMsg
//     NetMsgType
//     NetMsgFrom
//     NetMsgTo
//     NetMsgData
//     SendNetMsg
//#endregion

//#region DirectShow
//     OpenMovie
//     CloseMovie
//     DrawMovie
//     MovieWidth
//     MovieHeight
//     MoviePlaying
//#endregion

//#region Sound/Music
//     LoadSound
//     FreeSound

//     LoopSound

//     SoundPitch
//     SoundVolume
//     SoundPan

//     PlaySound
//     PlayMusic
//     PlayCDTrack
//     StopChannel
//     PauseChannel
//     ResumeChannel

//     ChannelPitch
//     ChannelVolume
//     ChannelPan
//     ChannelPlaying
//#endregion

//#region Graphics

//buffer on canvas
//https://stackoverflow.com/questions/2795269/does-html5-canvas-support-double-buffering

//     Graphics
function graphics(width, height, colorDepth = 0, mode = 0){
    canvas.width = width
    canvas.height = height
    colorDepth = 0 //16,24,32 bit : 0 = automatic selection
    mode = 0 // 0: auto (windowed in debug, full in non debug) - 1: fullscreen - 2:windowed mode - 3: scaled windowed mode
}
//     EndGraphics-
    //end the graphics mode, ex: used to switch between full and window state.

//     SetBuffer
//     FrontBuffer
//     BackBuffer
//     LoadBuffer
//     SaveBuffer
//     LockBuffer
//     UnlockBuffer
//     GraphicsBuffer

//     ReadPixel
//     WritePixel
//     ReadPixelFast
//     WritePixelFast
//     CopyPixel
//     CopyPixelFast
//     CopyRect

//     Viewport

//     Origin
function origin(xo, yo){
    ctx.translate(xo,yo)
}

//     Flip

//     VWait
//     ScanLine

//     GraphicsHeight
function graphicsHeight(){
    return canvas.height
}
//     GraphicsWidth
function graphicsWidth(){
    return canvas.width
}
//     GraphicsDepth
function graphicsDepth(){
    return 32
}

//     Color
function color(colour){
    ctx.fillStyle = colour;
    ctx.strokeStyle = colour;
}

//     ClsColor
function clsColor(colour){
    color(colour)
    rect(0,0, canvas.width, canvas.height)
}

//     Cls
function cls(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    // ctx.beginPath()
}
//     Plot
function plot(x,y){
    rect(x,y, 1,1)
}
//     Line
function line(startX,startY, endX,endY){
    ctx.beginPath()
    ctx.moveTo(startX,startY)
    ctx.lineTo(endX,endY)
    ctx.closePath()
    ctx.stroke()
}
//     Rect
function rect(x1,y1, xSize,ySize, solid=true){
    solid ? ctx.fillRect(x1,y1,xSize,ySize) :ctx.strokeRect(x1,y1,xSize,ySize)
}
//     Oval
function oval(x1,y1, xSize,ySize, solid=true){
    // solid ? ctx.fillRect(x1,y1,xSize,ySize) :ctx.strokeRect(x1,y1,xSize,ySize)
    ctx.beginPath()
    // ellipse(x,y, radiusX,radiusY, rotation, startAngle,endAngle, counterclockwise)
    ctx.ellipse(x1,y1, xSize,ySize, 0, 0,tau)
    solid ? ctx.fill() : ctx.stroke()
}
//     GetColor
//     ColorRed
//     ColorGreen
//     ColorBlue

//     CountGFXModes
//     CountGfxDrivers
//     GfxDriverName
//     SetGfxDriver

//     GFXModeWidth
//     GFXModeHeight
//     GFXModeDepth
//     GfxModeExists

//     TotalVidMem
//     AvailVidMem

//     SetGamma
//     UpdateGamma
//     GammaRed
//     GammaGreen
//     GammaBlue
//#endregion

//#region Image
//     LoadImage
//     CopyImage
//     CreateImage
//     LoadAnimImage
//     FreeImage
//     SaveImage
//     GrabImage
//     ImageBuffer

//     DrawImage
//     DrawImageRect
//     DrawBlockRect
//     DrawBlock
//     TileImage
//     TileBlock
//     MaskImage

//     HandleImage
//     MidHandle
//     AutoMidHandle

//     ScaleImage
//     ResizeImage
//     RotateImage
//     TFormImage
//     TFormFilter

//     ImageWidth
//     ImageHeight
//     ImageXHandle
//     ImageYHandle

//     ImagesOverlap
//     ImagesCollide
//     RectsOverlap
//     ImageRectOverlap
//     ImageRectCollide
//#endregion

//#region Time
//     Millisecs
//     Delay
//     CurrentDate
//     CurrentTime
//     CreateTimer
//     FreeTimer
//     WaitTimer
//#endregion

//#region System
//     ShowPointer
//     HidePointer

//     AppTitle
//     CommandLine

//     SystemProperty
//     SetEnv
//     GetEnv

//     CallDLL
//     ExecFile
//     RuntimeError
//     End
//#endregion

//#region Debug
//     Stop
//     DebugLog
function debugLog(input){
    console.log(input)
}
//#endregion