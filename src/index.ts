/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-24 16:58:03
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-23 17:45:32
 * @FilePath: \\src\\index.ts
 * @Description: 脚本入口 - 同时按住两个指定位置并显示日志窗口
 */
import { } from "./global";
import { init } from "./lib/init";

try {
    init();

    // 等待2秒
    sleep(2000);

    // 定义要按住的两个位置
    const position1 = { x: 393, y: 1238 };
    const position2 = { x: 2371, y: 1423 };
    const position3 = { x: 237, y: 583 };

    // 同时按住两个位置
    while (true) {
        // 使用gestures函数实现多点触控，同时按住两个位置
        gestures(
            [0, 1000, [position1.x, position1.y]],  // 第一个点按住较长的时间
            [0, 1000, [position2.x, position2.y]],   // 第二个点也按住较长的时间
            [3000, 100, [position3.x, position3.y]]
        );

    }

} catch (error) {
    console.error("程序执行出错:", error);
    toastLog("程序执行出错: " + error);
}