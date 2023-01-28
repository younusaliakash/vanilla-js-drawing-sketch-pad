const draw = {}

draw.path = (ctx, path, color = "black") => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath()
    ctx.moveTo(...path[0]);
    for( let index= 1 ; index < path.length; index++){
        ctx.lineTo(...path[index]);
    }
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.stroke()
}

draw.paths = (ctx, paths, color = "black") => {
    for(const path of paths){
        draw.path(ctx, path, color)
    }
}