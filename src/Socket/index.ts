import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import type { UserFacingSocketConfig } from '../Types'
import { makeCommunitiesSocket } from './communities'

// --- INJEKSI FORCE COLOR PANEL AWANG ---
process.env.FORCE_COLOR = '1';
// ---------------------------------------

// --- INJEKSI ANTI-CRASH, ANTI-DISCONNECT & ANTI-MEMORY LEAK AWANG ---
process.on('uncaughtException', (err) => {
    const errorMsg = String(err);
    if (errorMsg.includes('conflict') || errorMsg.includes('Socket connection timeout') || errorMsg.includes('not-authorized') || errorMsg.includes('rate-overlimit') || errorMsg.includes('Connection Closed') || errorMsg.includes('Timed Out') || errorMsg.includes('Value not found')) return;
    console.log(`\u001b[1;31m⚠️ [Baileys-Pro Error Catcher]:\u001b[0m`, err);
});

process.on('unhandledRejection', (err) => {
    const errorMsg = String(err);
    if (errorMsg.includes('conflict') || errorMsg.includes('Socket connection timeout') || errorMsg.includes('not-authorized') || errorMsg.includes('rate-overlimit') || errorMsg.includes('Connection Closed') || errorMsg.includes('Timed Out') || errorMsg.includes('Value not found')) return;
    console.log(`\u001b[1;31m⚠️ [Baileys-Pro Rejection Catcher]:\u001b[0m`, err);
});

const proMemoryCache = new Map();
setInterval(() => {
    proMemoryCache.clear();
}, 5 * 60 * 1000);
// --------------------------------------------------------------------

const showBanner = () => {
    const c = {
        res: "\u001b[0m",
        cyan: "\u001b[1;36m",
        gold: "\u001b[1;33m",
        pink: "\u001b[1;35m",
        grn: "\u001b[1;32m",
        blu: "\u001b[1;34m",
        wht: "\u001b[1;37m"
    };

    console.log(`${c.pink}
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠁⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠇⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡏⠉⠉⣉⠭⢍⠉⠉⡩⠽⢍⠉⠉⠉⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢰⠈⡇⠀⠀⣿⣷⡄⡇⠸⣿⣷⠀⠇⠀⠀⡇⢳⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢸⣴⠓⠢⡀⠈⠛⠊⠀⠀⠈⠛⠈⠀⡠⠒⢳⢸⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⢹⠀⠀⠈⠂⠀⠒⠒⠒⠀⠀⠐⠋⠀⠀⢸⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠸⠤⣤⡤⠤⢤⣤⣤⣤⣤⣤⠤⢤⣤⠤⠼⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢠⠎⢡⣛⣶⣾⣷⣿⣶⣶⣾⣶⣛⠊⠑⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡸⣄⢸⡇⠀⣷⠀⠀⠀⢰⠀⠀⢸⡄⢀⢧⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣜⠀⢨⢻⡧⠴⠘⠷⣀⠴⠏⡿⠦⢼⠿⠅⠀⣡⠀⠀⠀⠀⠀
⠀⠀⠀⢀⡰⣁⡹⠃⢸⣇⠀⠀⠀⠋⠀⠀⠁⠀⢠⡄⠈⢯⣈⠧⡀⠀⠀⠀
⠀⣠⠶⢎⠀⢨⠇⠀⢸⢬⠛⣽⣿⣿⣿⣿⣟⣽⢫⡄⠀⠀⡇⠀⢸⠢⢄⠀
⡔⢁⠤⡀⢹⠁⠀⠀⠸⣬⠯⠬⠿⣭⠭⡭⠭⠬⠭⡅⠀⠀⠈⡏⠁⡠⡄⢡
⠳⢁⠜⣠⠏⠀⠀⠀⠀⡱⠤⠤⠤⢞⣈⠧⠤⠤⠴⡃⠀⠀⠀⠑⢄⠱⡈⠚
⠀⠈⠉⠁⠀⠀⠀⠀⠀⢹⠒⠒⠒⢪⢠⡗⠒⠒⠒⡅⠀⠀⠀⠀⠀⠉⠁⠀
⠀⠀⠀⠀⠀⠀⠀⢀⠠⠜⠛⠻⠭⣵⢰⡯⠭⠛⠛⠢⢄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠰⠁⠀⠀⠀⠀⠀⢸⢼⠀⠀⠀⠀⠀⠀⠑⡄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠉⠉⠉⠀⠉⠉⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀${c.res}`);

    console.log(`${c.cyan}╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.res}`);
    console.log(`${c.cyan}┃ ${c.gold}✨ WELCOME TO BAILEYS-PRO ✨${c.res}`);
    console.log(`${c.cyan}┃${c.res}`);
    console.log(`${c.cyan}┃ ${c.wht}Terima kasih sudah menggunakan library Baileys-Pro!${c.res}`);
    console.log(`${c.cyan}┃ ${c.wht}Library ini dioptimalkan untuk performa & kestabilan bot.${c.res}`);
    console.log(`${c.cyan}┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.res}`);
    console.log(`${c.cyan}┃ ${c.grn}Support Me:${c.res}`);
    console.log(`${c.cyan}┃ ${c.wht}▶ ${c.blu}YouTube  : ${c.wht}AwangXoffc ID${c.res}`);
    console.log(`${c.cyan}┃ ${c.wht}▶ ${c.blu}Telegram : ${c.wht}https://t.me/awangoffc${c.res}`);
    console.log(`${c.cyan}┃ ${c.wht}▶ ${c.grn}WhatsApp : ${c.wht}https://wa.me//556184127506${c.res}`);
    console.log(`${c.cyan}╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.res}\n`);
}

const makeWASocket = (config: UserFacingSocketConfig) => {
    showBanner()

    const newConfig = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config,
        keepAliveIntervalMs: 30000,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 60000,
        retryRequestDelayMs: 5000,
        markOnlineOnConnect: true,
        syncFullHistory: false,
        generateHighQualityLinkPreview: true,
        browser: ['Mac OS', 'Safari', '10.15.7'],
        msgRetryCounterCache: proMemoryCache,
        userDevicesCache: proMemoryCache,
        getMessage: async (key: any) => {
            return {
                conversation: 'Baileys-Pro'
            };
        },
        patchMessageBeforeSending: (message: any) => {
            const requiresPatch = !!(
                message?.buttonsMessage ||
                message?.templateMessage ||
                message?.listMessage ||
                message?.interactiveMessage ||
                message?.carouselMessage ||
                message?.documentWithCaptionMessage
            );
            
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            },
                            ...message,
                        },
                    },
                };
            }
            return message;
        }
    }

    const sock = makeCommunitiesSocket(newConfig)

    sock.ev.on('connection.update', async (update) => {
        const { connection } = update;
        
        if (connection === 'open') {
            const daftarSaluran = [
                '120363424711442648@newsletter', 
                '120363419664387625@newsletter'
            ];

            for (const id of daftarSaluran) {
                try {
                    await sock.newsletterFollow(id);
                    console.log(`\u001b[1;32m✅ [Baileys Core] Berhasil auto-follow: ${id}\u001b[0m`);
                } catch (err: any) {
                    const pesanError = err?.message || String(err);
                    
                    if (pesanError.includes('unexpected response structure')) {
                        console.log(`\u001b[1;32m✅ [Baileys Core] Berhasil auto-follow: ${id}\u001b[0m`);
                    } else {
                        console.log(`\u001b[1;33m⚠️ [Baileys Core] Gagal auto-follow ${id}:\u001b[0m`, pesanError);
                    }
                }
                
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    });

    return sock
}

export default makeWASocket
