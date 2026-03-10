import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import type { UserFacingSocketConfig } from '../Types'
import { makeCommunitiesSocket } from './communities'

// Fungsi untuk menampilkan banner log aesthetic
function showBanner() {
    const c = {
        res: "\x1b[0m",   // Reset
        cyan: "\x1b[36m",
        mag: "\x1b[35m",  // Magenta
        yel: "\x1b[33m",  // Yellow
        grn: "\x1b[32m",  // Green
        blu: "\x1b[34m",  // Blue
        b: "\x1b[1m"      // Bold
    };

    console.log(`${c.mag}
‎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠁⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠇⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⠀⡏⠉⠉⣉⠭⢍⠉⠉⡩⠽⢍⠉⠉⠉⡇⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⢰⠈⡇⠀⠀⣿⣷⡄⡇⠸⣿⣷⠀⠇⠀⠀⡇⢳⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⢸⣴⠓⠢⡀⠈⠛⠊⠀⠀⠈⠛⠈⠀⡠⠒⢳⢸⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠈⢹⠀⠀⠈⠂⠀⠒⠒⠒⠀⠀⠐⠋⠀⠀⢸⠁⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⠸⠤⣤⡤⠤⢤⣤⣤⣤⣤⣤⠤⢤⣤⠤⠼⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⢠⠎⢡⣛⣶⣾⣷⣿⣶⣶⣾⣶⣛⠊⠑⡄⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⡸⣄⢸⡇⠀⣷⠀⠀⠀⢰⠀⠀⢸⡄⢀⢧⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⣜⠀⢨⢻⡧⠴⠘⠷⣀⠴⠏⡿⠦⢼⠿⠅⠀⣡⠀⠀⠀⠀⠀
‎⠀⠀⠀⢀⡰⣁⡹⠃⢸⣇⠀⠀⠀⠋⠀⠀⠁⠀⢠⡄⠈⢯⣈⠧⡀⠀⠀⠀
‎⠀⣠⠶⢎⠀⢨⠇⠀⢸⢬⠛⣽⣿⣿⣿⣿⣟⣽⢫⡄⠀⠀⡇⠀⢸⠢⢄⠀
‎⡔⢁⠤⡀⢹⠁⠀⠀⠸⣬⠯⠬⠿⣭⠭⡭⠭⠬⠭⡅⠀⠀⠈⡏⠁⡠⡄⢡
‎⠳⢁⠜⣠⠏⠀⠀⠀⠀⡱⠤⠤⠤⢞⣈⠧⠤⠤⠴⡃⠀⠀⠀⠑⢄⠱⡈⠚
‎⠀⠈⠉⠁⠀⠀⠀⠀⠀⢹⠒⠒⠒⢪⢠⡗⠒⠒⠒⡅⠀⠀⠀⠀⠀⠉⠁⠀
‎⠀⠀⠀⠀⠀⠀⠀⢀⠠⠜⠛⠻⠭⣵⢰⡯⠭⠛⠛⠢⢄⠀⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⠰⠁⠀⠀⠀⠀⠀⢸⢼⠀⠀⠀⠀⠀⠀⠑⡄⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠉⠉⠉⠀⠉⠉⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀${c.res}`);

    console.log(`${c.b}${c.cyan}╔════════════════════════════════════════════════════════════════╗${c.res}`);
    console.log(`${c.b}${c.cyan}║ ${c.yel}✨ WELCOME TO BAILEYS-PRO ✨                                   ${c.cyan}║${c.res}`);
    console.log(`${c.b}${c.cyan}║ ${c.res}Terima kasih sudah menggunakan library Baileys-Pro!            ${c.cyan}║${c.res}`);
    console.log(`${c.b}${c.cyan}║ ${c.res}Library ini dioptimalkan untuk performa & kestabilan bot.      ${c.cyan}║${c.res}`);
    console.log(`${c.b}${c.cyan}╠════════════════════════════════════════════════════════════════╣${c.res}`);
    console.log(`${c.b}${c.cyan}║ ${c.grn}Support Me:                                                    ${c.cyan}║${c.res}`);
    console.log(`${c.b}${c.cyan}║ ${c.res}▶ ${c.blu}YouTube  :${c.res} AwangXoffc ID                                   ${c.cyan}║${c.res}`);
    console.log(`${c.b}${c.cyan}║ ${c.res}▶ ${c.blu}Telegram :${c.res} https://t.me/awangoffc                          ${c.cyan}║${c.res}`);
    console.log(`${c.b}${c.cyan}║ ${c.res}▶ ${c.grn}WhatsApp :${c.res} https://wa.me//556184127506                     ${c.cyan}║${c.res}`);
    console.log(`${c.b}${c.cyan}╚════════════════════════════════════════════════════════════════╝${c.res}\n`);
}

// export the last socket layer
const makeWASocket = (config: UserFacingSocketConfig) => {
    // Menjalankan banner sebelum proses config dan socket dimulai
    showBanner()

    const newConfig = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config
    }

    return makeCommunitiesSocket(newConfig)
}

export default makeWASocket
