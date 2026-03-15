import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import type { UserFacingSocketConfig } from '../Types'
import { makeCommunitiesSocket } from './communities'
import * as readline from 'readline'
import * as util from 'util'

// --- MANTRA FORCE COLOR PANEL ---
process.env.FORCE_COLOR = '1';
// --------------------------------

// --- ABSOLUTE BLACKHOLE OVERRIDE LOG ---
const originalLog = console.log;
const originalInfo = console.info;
const originalDebug = console.debug;
const originalWarn = console.warn;

const filterLog = (args: any[], originalFn: any) => {
    const logStr = util.format(...args);
    if (
        logStr.includes('SessionEntry') || 
        logStr.includes('Closing session') || 
        logStr.includes('_chains') || 
        logStr.includes('ephemeralKeyPair') || 
        logStr.includes('registrationId') || 
        logStr.includes('unexpected response structure') ||
        logStr.includes('Baileys') && !logStr.includes('Awang OFC')
    ) return;
    originalFn.apply(console, args);
};

console.log = (...args) => filterLog(args, originalLog);
console.info = (...args) => filterLog(args, originalInfo);
console.debug = (...args) => filterLog(args, originalDebug);
console.warn = (...args) => filterLog(args, originalWarn);

const silentLogger: any = {
    level: 'silent',
    log: () => {}, info: () => {}, warn: () => {}, 
    error: () => {}, trace: () => {}, debug: () => {}, 
    fatal: () => {}, child: function() { return this; }
};
// ---------------------------------------

// --- SISTEM DETEKSI ERROR CERDAS & MEWAH ---
const ignoreErrors = ['conflict', 'Socket connection timeout', 'not-authorized', 'rate-overlimit', 'Connection Closed', 'Timed Out', 'Value not found', 'ENOENT', 'ECONNREFUSED'];

process.on('uncaughtException', (err) => {
    const errorMsg = String(err);
    if (ignoreErrors.some(e => errorMsg.includes(e))) return;
    originalLog(`\n\u001b[1;31m┏━-----------------------------\u001b[0m`);
    originalLog(`\u001b[1;31m❘ \u001b[1;33m⚠️ SISTEM MENDETEKSI ERROR (UNCAUGHT EXCEPTION)\u001b[0m`);
    originalLog(`\u001b[1;31m❘ \u001b[1;37m${errorMsg.split('\n').join('\n\u001b[1;31m❘ \u001b[1;37m')}\u001b[0m`);
    originalLog(`\u001b[1;31m┗━-------------------------------\u001b[0m\n`);
});

process.on('unhandledRejection', (err) => {
    const errorMsg = String(err);
    if (ignoreErrors.some(e => errorMsg.includes(e))) return;
    originalLog(`\n\u001b[1;31m┏━----------------------------\u001b[0m`);
    originalLog(`\u001b[1;31m❘ \u001b[1;33m⚠️ SISTEM MENDETEKSI ERROR (UNHANDLED REJECTION)\u001b[0m`);
    originalLog(`\u001b[1;31m❘ \u001b[1;37m${errorMsg.split('\n').join('\n\u001b[1;31m❘ \u001b[1;37m')}\u001b[0m`);
    originalLog(`\u001b[1;31m┗━------------------------------\u001b[0m\n`);
});
// -------------------------------------------

// --- ANTI MEMORY LEAK CACHE ---
const proMemoryCache = new Map();
setInterval(() => { proMemoryCache.clear(); }, 5 * 60 * 1000);
// ------------------------------

// --- OVERRIDE BANNER ART MEWAH AWANG ---
const showBanner = () => {
    const art = [
        `\u001b[1;35m⡏⠉⠉⠉⠉⠉⠉⠋⠉⠉⠉⠉⠉⠉⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠙⠉⠉⠉⠹\u001b[0m`,
        `\u001b[1;35m⡇⢸⣿⡟⠛⢿⣷ ⢸⣿⡟⠛⢿⣷⡄⢸⣿⡇ ⢸⣿⡇⢸⣿⡇ ⢸⣿⡇ \u001b[0m`,
        `\u001b[1;35m⡇⢸⣿⣧⣤⣾⠿ ⢸⣿⣇⣀⣸⡿⠃⢸⣿⡇ ⢸⣿⡇⢸⣿⣇⣀⣸⣿⡇ \u001b[0m`,
        `\u001b[1;35m⡇⢸⣿⡏⠉⢹⣿⡆⢸⣿⡟⠛⢻⣷⡄⢸⣿⡇ ⢸⣿⡇⢸⣿⡏⠉⢹⣿⡇ \u001b[0m`,
        `\u001b[1;35m⡇⢸⣿⣧⣤⣼⡿⠃⢸⣿⡇ ⢸⣿⡇⠸⣿⣧⣤⣼⡿⠁⢸⣿⡇ ⢸⣿⡇ \u001b[0m`,
        `\u001b[1;35m⣇⣀⣀⣀⣀⣀⣀⣄⣀⣀⣀⣀⣀⣀⣀⣠⣀⡈⠉⣁⣀⣄⣀⣀⣀⣠⣀⣀⣀⣰\u001b[0m`,
        `\u001b[1;36m⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷\u001b[0m`,
        `\u001b[1;36m⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇\u001b[0m`,
        `\u001b[1;36m⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⠼⢐⢕⢽\u001b[0m`,
        `\u001b[1;36m⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕\u001b[0m`,
        `\u001b[1;36m⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕\u001b[0m`,
        `\u001b[1;36m⡝⡵⠟⠈⢀⣀⣀⡀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⡀⢕\u001b[0m`,
        `\u001b[1;36m⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄\u001b[0m`,
        `\u001b[1;36m⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕\u001b[0m`,
        `\u001b[1;36m⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿\u001b[0m`,
        `\u001b[1;36m⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\u001b[0m`,
        `\u001b[1;36m⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟\u001b[0m`,
        `\u001b[1;36m⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠\u001b[0m`,
        `\u001b[1;36m⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙\u001b[0m`,
        `\u001b[1;36m⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣\u001b[0m`,
        `\u001b[1;36m-------------------------------------\u001b[0m`,
        `\u001b[1;33m Welcome To Baileys - © BY Awang OFC\u001b[0m`,
        `\u001b[1;36m-------------------------------------\u001b[0m`,
        ` `,
        `\u001b[1;36m┏━-----------------------------------\u001b[0m`,
        `\u001b[1;36m❘ \u001b[1;37m• \u001b[1;34mYouTube   \u001b[1;37m: AwangXoffc ID\u001b[0m`,
        `\u001b[1;36m❘ \u001b[1;37m• \u001b[1;34mTelegram  \u001b[1;37m: https://t.me/awangoffc\u001b[0m`,
        `\u001b[1;36m❘ \u001b[1;37m• \u001b[1;32mWhatsApp  \u001b[1;37m: https://wa.me//556184127506\u001b[0m`,
        `\u001b[1;36m┗━------------------------------------\u001b[0m\n`
    ];
    art.forEach(line => originalLog(line));
}
// ----------------------------------------

const makeWASocket = (config: UserFacingSocketConfig) => {
    showBanner();

    const newConfig: any = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config,
        logger: silentLogger,
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
        getMessage: async (key: any) => { return { conversation: 'Baileys-Pro' }; },
        
        // --- SMART BUTTON PASS-THROUGH AWANG ---
        patchMessageBeforeSending: (message: any) => {
            if (message?.viewOnceMessage || message?.viewOnceMessageV2 || message?.viewOnceMessageV2Extension) {
                return message;
            }
            const isInteractive = !!(
                message?.buttonsMessage || message?.templateMessage || message?.listMessage || 
                message?.interactiveMessage || message?.carouselMessage || message?.documentWithCaptionMessage
            );
            if (isInteractive) {
                return {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: { deviceListMetadataVersion: 2, deviceListMetadata: {} },
                            ...message
                        }
                    }
                };
            }
            return message;
        }
        // ---------------------------------------
    }

    const sock = makeCommunitiesSocket(newConfig);
    const sockAny = sock as any;

    // --- SISTEM CEGAT PAIRING CODE CERDAS & ANTI-BUG ---
    let pairingRequested = false;
    let pairingFallbackTimer: NodeJS.Timeout;

    if (typeof sockAny.waitForPairingCode === 'function') {
        const originalWaitForPairingCode = sockAny.waitForPairingCode;
        sockAny.waitForPairingCode = async (phoneNumber: string) => {
            pairingRequested = true;
            clearTimeout(pairingFallbackTimer);
            try {
                const code = await originalWaitForPairingCode.call(sockAny, phoneNumber);
                originalLog(`\n\u001b[1;36m┏━------------------------------------\u001b[0m`);
                originalLog(`\u001b[1;36m❘ \u001b[1;33m✨ PAIRING CODE ANDA : \u001b[1;37m${code?.match(/.{1,4}/g)?.join('-') || code}\u001b[0m`);
                originalLog(`\u001b[1;36m┗━--------------------------------------\u001b[0m\n`);
                return code;
            } catch (error) {
                throw error;
            }
        };
    }

    pairingFallbackTimer = setTimeout(async () => {
        if (!sockAny.authState?.creds?.registered && !sockAny.authState?.creds?.me && !pairingRequested) {
            originalLog(`\n\u001b[1;31m┏━-----------------------------\u001b[0m`);
            originalLog(`\u001b[1;31m❘ \u001b[1;33m⚙️  SYSTEM BAILEYS : SCRIPT BOT TIDAK MEMINTA PAIRING CODE\u001b[0m`);
            originalLog(`\u001b[1;31m❘ \u001b[1;37mSilakan masukkan nomor secara manual di bawah ini.\u001b[0m`);
            originalLog(`\u001b[1;31m┗━-------------------------------\u001b[0m\n`);
            
            const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
            rl.question(`\u001b[1;36m ❘ \u001b[1;32mMasukkan Nomor WA (Contoh: 628xxx) : \u001b[1;37m`, async (nomor) => {
                rl.close();
                if (typeof sockAny.waitForPairingCode === 'function') {
                    await sockAny.waitForPairingCode(nomor.trim());
                }
            });
        }
    }, 5000);
    // ---------------------------------------------------

    // --- AUTO FOLLOW LOG BERSIH & MEWAH ---
    sock.ev.on('connection.update', async (update) => {
        const { connection } = update;
        
        if (connection === 'open') {
            const daftarSaluran = ['120363424711442648@newsletter', '120363419664387625@newsletter'];
            for (const id of daftarSaluran) {
                try {
                    await sock.newsletterFollow(id);
                    originalLog(`\u001b[1;36m ❘ \u001b[1;32m✨ System: Sukses Mengikuti Saluran Pusat!\u001b[0m`);
                } catch (err: any) {
                    if (err?.message?.includes('unexpected response structure')) {
                        originalLog(`\u001b[1;36m ❘ \u001b[1;32m✨ System: Sukses Mengikuti Saluran Pusat!\u001b[0m`);
                    }
                }
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    });
    // --------------------------------------

    return sock;
}

export default makeWASocket
