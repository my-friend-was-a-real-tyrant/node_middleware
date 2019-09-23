export default ((width) => {
    const nowWidth=document.documentElement.clientWidth;
    if(nowWidth >= width)
    {
        document.documentElement.style.fontSize="625%";
    }
    else
    {
        document.documentElement.style.fontSize=625*nowWidth/width+"%";
    }
});