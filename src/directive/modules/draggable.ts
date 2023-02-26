import type { Directive } from 'vue';
interface EleType extends HTMLElement {
  parentNode: HTMLElement;
}

export const draggable: Directive = {
  mounted: function (el: EleType, binding) {
    el.style.cursor = 'move';
    el.style.position = 'absolute';
    el.onmousedown = function (e) {
      e.preventDefault();
      // 鼠标相对元素左和上的坐标
      const relativeX = e.pageX - el.offsetLeft;
      const relativeY = e.pageY - el.offsetTop;
      let lastX: number | null = null;
      let lastY: number | null = null;
      document.onmousemove = function (e) {
        e.preventDefault();
        // 获取移动后的元素的坐标
        let x = e.pageX - relativeX;
        let y = e.pageY - relativeY;
        // 可移动位置的大小
        const maxX = el.parentNode.offsetWidth - el.offsetWidth;
        const maxY = el.parentNode.offsetHeight - el.offsetHeight;
        x = Math.min(Math.max(0, x), maxX);
        y = Math.min(Math.max(0, y), maxY);
        lastX = x;
        lastY = y;
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        binding.value?.onMouseMove?.({ x: lastX, y: lastY, index: binding.value.index });
      };
      document.onmouseup = function () {
        if (lastX !== null && lastY !== null) {
          binding.value?.onMouseup?.({ x: lastX, y: lastY, index: binding.value.index });
        }
        document.onmousemove = document.onmouseup = null;
      };
    };
  }
};
