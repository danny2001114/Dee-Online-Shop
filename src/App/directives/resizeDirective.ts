import type { Directive } from 'vue'

function adjustSize(children: NodeListOf<HTMLElement>, sizes: number[], target: "width" | "height") {
    const maxSize = Math.max(...sizes);

    children.forEach((el) => {
      el.style[target] = `${maxSize}px`;
    })
}

const directive : Directive = {
  mounted(el: HTMLElement, binding) {
    const children = el.querySelectorAll<HTMLElement>(binding.value);
    
    switch (binding.arg) {
      case "width":
        var sizes = Array.from(children).map((el) => el.offsetWidth);
        adjustSize(children, sizes, "width");
        break;
      case "height":
        console.log(binding.value);
        var sizes = Array.from(children).map((el) => el.offsetHeight);
        adjustSize(children, sizes, "height");
        break;
      default:
        var { width, height } = Array.from(children).reduce<{width: number[], height: number[]}>((result, el) => {
          result.width.push(el.offsetWidth);
          result.height.push(el.offsetHeight);
          return result;
        }, {width: [], height: []});
        adjustSize(children, width, "width");
        adjustSize(children, height, "width");
    }
  },
}

export default directive;
