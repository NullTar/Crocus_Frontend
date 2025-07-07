export const scrollToTop = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth" // 使用平滑滚动
    });
};

export const scrollToLocation = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}

