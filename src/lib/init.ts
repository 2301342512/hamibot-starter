/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 20:58:39
 * @LastEditor: BATU1579
 * @LastTime: 2023-08-07 08:06:24
 * @FilePath: \\src\\lib\\init.ts
 * @Description: 脚本初始化
 */
import { Record } from "./logger";
import { SHOW_CONSOLE, SHORT_WAIT_MS } from "../global";
import { PermissionException, ServiceNotEnabled } from "./exception";

/**
 * 初始化函数 - 执行脚本运行前的必要检查和设置
 * 包括无障碍服务权限检查、设备信息获取、日志窗口设置以及屏幕坐标系统配置
 */
export function init() {
    // 检查无障碍服务权限是否已经开启
    // auto.service 是 Hamibot 无障碍服务对象，如果为 null 表示服务未启动
    if (auto.service === null) {
        // 如果无障碍服务未开启，则弹出对话框询问用户是否开启
        if (!confirm('Please enable accessibility permission')) {
            // 如果用户拒绝开启权限，则抛出权限异常
            throw new PermissionException("Accessibility permission obtaining failure.");
        }
        // 等待用户开启无障碍服务，这是一个阻塞操作，直到服务开启才继续执行
        auto.waitFor();
    } else {
        // 记录无障碍权限已启用的信息
        Record.verbose("Accessibility permissions enabled");
    }

    // 检查设备服务是否正常运行
    // 如果屏幕高度或宽度为0，表示设备信息获取失败，可能是无障碍服务未完全启动
    if (device.height === 0 || device.width === 0) {
        // 抛出服务未启用异常，提示用户重启服务或重装 Hamibot
        throw new ServiceNotEnabled(
            'Failed to get the screen size. ' +
            'Please try restarting the service or re-installing Hamibot'
        );
    } else {
        // 记录屏幕尺寸信息
        Record.debug("Screen size: " + device.height + " x " + device.width);
    }

    // 显示控制台日志窗口（如果全局配置中设置了显示）
    if (SHOW_CONSOLE) {
        // 显示 Hamibot 调试控制台窗口
        console.show();
        // 短暂休眠，等待控制台窗口完全渲染
        sleep(SHORT_WAIT_MS);
        // 设置控制台窗口的位置（距离屏幕左侧30px，顶部30px）
        console.setPosition(0, 0);
        // 设置控制台窗口大小（宽度为420px，高度为420px，限制在(30,30)到(450,450)范围内）
        console.setSize(500, 500);
    }

    // 根据设备方向动态设置虚拟屏幕分辨率
    // Determine orientation and set appropriate screen metrics
    if (device.width > device.height) {
        // 横屏模式: 宽度大于高度，设置分辨率为 2560x1600
        setScreenMetrics(2560, 1600);
        Record.debug("Landscape mode detected, setting screen metrics to 2560x1600");
    } else {
        // 竖屏模式: 高度大于宽度，设置分辨率为 1600x2560
        setScreenMetrics(1600, 2560);
        Record.debug("Portrait mode detected, setting screen metrics to 1600x2560");
    }
}