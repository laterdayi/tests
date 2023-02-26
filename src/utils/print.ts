import printJS from 'print-js';

/**
 * @description: 打印
 * @param {string} 容器id
 * @return {*}
 */
export const usePrint = (id: string) => {
  printJS({
    printable: id,
    type: 'html',
    header: document.title,
    targetStyles: ['*'],
    headerStyle: 'fonst-size:16px;font-weight:normal;'
  });
};
