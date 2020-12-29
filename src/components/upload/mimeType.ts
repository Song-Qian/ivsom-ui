/**
 * Developer    :   SongQian
 * Time         :   2020-08-09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   定义文件类型Mime类型
 */
const MimeMap = {
    "audio/aac" : [".aac"],
    "application/envoy" : [".evy"],
    "application/epub+zip" : [".epub"],
    "application/fractals" : [".fif"],
    "application/futuresplash" : [".spl"],
    "application/hta" : [".hta"],
    "application/internet-property-stream" : [".acx"],
    "application/java-archive" : [".jar"],
    "application/mac-binhex40" : [".hqx"],
    "application/msword" : [".doc", ".dot"],
    "application/octet-stream" : ["*", ".bin", ".class", ".dms", ".exe", ".lha", ".lzh"],
    "application/oda" : [".oda"],
    "application/olescript" : [".axs"],
    "application/ogg" : [".ogx"],
    "application/pdf" : [".pdf"],
    "application/pics-rules" : [".prf"],
    "application/pkcs10" : [".p10"],
    "application/pkix-crl" : [".crl"],
    "application/postscript" : [".ai", ".eps", ".ps"],
    "application/rtf" : [".rtf"],
    "application/set-payment-initiation" : [".setpay"],
    "application/set-registration-initiation" : [".setreg"],
    "application/vnd.ms-excel" : [".xla", ".xlc", ".xlm", ".xls", ".xlt", ".xlw"],
    "application/vnd.ms-outlook" : [".msg"],
    "application/vnd.ms-pkicertstore" : [".sst"],
    "application/vnd.ms-pkiseccat" : [".cat"],
    "application/vnd.ms-pkistl" : [".stl"],
    "application/vnd.ms-powerpoint" : [".pot", ".pps", ".ppt"],
    "application/vnd.ms-project" : [".mpp"],
    "application/vnd.ms-works" : [".wcm", ".wdb", ".wks", ".wps"],
    "application/vnd.mozilla.xul+xml" : [".xul"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : [".xlsx"],
    "application/winhlp" : [".hlp"],
    "application/xhtml+xml" : [".xhtml"],
    "application/xml" : [".xml"],
    "application/x-7z-compressed" : [".7z"],
    "application/x-abiword" : [".abw"],
    "application/x-bcpio" : [".bcpio"],
    "application/x-bzip" : [".gz"],
    "application/x-bzip2" : [".bz2"],
    "application/x-cdf" : [".cdf"],
    "application/x-compress" : [".z"],
    "application/x-compressed" : [".tgz"],
    "application/x-cpio" : [".cpio"],
    "application/x-csh" : [".csh"],
    "application/x-director" : [".dcr", ".dir", ".dxr"],
    "application/x-dvi" : [".dvi"],
    "application/x-freearc" : [".arc"],
    "application/x-gtar" : [".gtar"],
    "application/x-gzip" : [".gz"],
    "application/x-hdf" : [".hdf"],
    "application/x-internet-signup" : [".ins", ".isp"],
    "application/x-iphone" : [".iii"],
    "application/x-javascript" : [".js"],
    "application/x-latex" : [".latex"],
    "application/x-msaccess" : [".mdb"],
    "application/x-mscardfile" : [".crd"],
    "application/x-msclip" : [".clp"],
    "application/x-msdownload" : [".dll"],
    "application/x-msmediaview" : [".m13", ".m14", ".mvb"],
    "application/x-msmetafile" : [".wmf"],
    "application/x-msmoney" : [".mny"],
    "application/x-mspublisher" : [".pub"],
    "application/x-msschedule" : [".scd"],
    "application/x-msterminal" : [".trm"],
    "application/x-mswrite" : [".wri"],
    "application/x-netcdf" : [".cdf", ".nc"],
    "application/x-perfmon" : [".pma", ".pmc", ".pml", ".pmr", ".pmw"],
    "application/x-pkcs12" : [".p12", ".pfx"],
    "application/x-pkcs7-certificates" : [".p7b", ".spc"],
    "application/x-pkcs7-certreqresp" : [".p7r"],
    "application/x-pkcs7-mime" : [".p7c", ".p7m"],
    "application/x-pkcs7-signature" : [".p7s"],
    "application/x-sh" : [".sh"],
    "application/x-shar" : [".shar"],
    "application/x-shockwave-flash" : [".swf"],
    "application/x-stuffit" : [".sit"],
    "application/x-sv4cpio" : [".sv4cpio"],
    "application/x-sv4crc" : [".sv4crc"],
    "application/x-tar" : [".tar"],
    "application/x-tcl" : [".tcl"],
    "application/x-tex" : ["tex"],
    "application/x-texinfo" : [".texi", ".texinfo"],
    "application/x-troff" : [".roff", ".t", ".tr"],
    "application/x-troff-man" : [".man"],
    "application/x-troff-me" : [".me"],
    "application/x-troff-ms" : [".ms"],
    "application/x-ustar" : [".ustar"],
    "application/x-rar-compressed" : [".rar"],
    "application/x-wais-source" : [".src"],
    "application/x-x509-ca-cert" : [".cer", ".crt", ".der"],
    "application/x-zip-compressed" : [".zip"],
    "application/vnd.apple.installer+xml" : [".mpkg"],
    "application/vnd.oasis.opendocument.presentation" : [".odp"],
    "application/vnd.oasis.opendocument.spreadsheet" : [".ods"],
    "application/vnd.oasis.opendocument.text" : [".odt"],
    "application/vnd.amazon.ebook" : [".azw"],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation" : [".pptx"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : [".docs"],
    "application/vnd.ms-fontobject" : [".eot"],
    "application/ynd.ms-pkipko" : [".pko"],
    "application/vnd.visio" : [".vsd"],
    "application/zip" : [".zip"],
    "audio/3gpp" : [".3gp"],
    "audio/3gpp2" : [".3g2"],
    "audio/basic" : [".au", ".snd"],
    "aduio/mid" : [".mid", ".rmi"],
    "audio/midi" : [".mid"],
    "video/ogg" : [".ogv"],
    "audio/mpeg" : [".mp3"],
    "audio/ogg" : [".oga"],
    "audio/x-aiff" : [".aif", ".aifc", ".aiff"],
    "audio/x-mpegurl" : [".m3u"],
    "audio/x-midi" : [".midi"],
    "audio/x-pn-realaudio" : [".ra", ".ram"],
    "audio/x-wav" : [".wav"],
    "audio/wav" : [".wav"],
    "audio/webm" : [".weba"],
    "font/otf" : [".otf"],
    "font/ttf" : [".ttf"],
    "font/woff" : [".woff"],
    "font/woff2" : [".woff2"],
    "image/png" : [".png"],
    "image/bmp" : [".bmp"],
    "image/cis-cod" : [".cod"],
    "image/gif" : [".gif"],
    "image/ief" : [".ief"],
    "image/jpeg" : [".jpe", ".jpeg", ".jpg"],
    "image/pipeg" : [".jfif"],
    "image/svg+xml" : [".svg"],
    "image/tiff" : [".tif", ".tiff"],
    "image/vnd.microsoft.icon" : [".ico"],
    "image/webp" : [".webp"],
    "image/x-cmu-raster" : [".ras"],
    "image/x-cmx" : [".cmx"],
    "image/x-icon" : [".icon", ".ico"],
    "image/x-portable-anymap" : [".pnm"],
    "image/x-portable-bitmap" : [".pbm"],
    "image/x-portable-graymap" : [".pgm"],
    "image/x-portable-pixmap" : [".ppm"],
    "image/x-rgb" : [".rgb"],
    "image/x-xbitmap" : [".xbm"],
    "image/x-xpixmap" : [".xpm"],
    "image/x-xwindowdump" : [".xwd"],
    "message/rfc822" : [".mht", ".mhtml", ".nws"],
    "text/calendar" : [".ics"],
    "text/css" : [".css"],
    "text/csv" : [".csv"],
    "text/h323" : [".323"],
    "text/html" : [".htm", ".html", ".stm"],
    "text/iuls" : [".uls"],
    "text/javascript" : [".js"],
    "application/json" : [".json"],
    "application/ld+json" : [".jsonld"],
    "text/plain" : [".bas", ".c", ".h", ".txt"],
    "text/richtext" : [".rtx"],
    "text/scriptlet" : [".sct"],
    "text/tab-separated-values" : [".tsv"],
    "text/webviewhtml" : [".htt"],
    "text/xml" : [".xml"],
    "text/x-component" : [".htc"],
    "text/x-setext" : [".etx"],
    "text/x-vcard" : [".vcf"],
    "video/3gpp" : [".3gp"],
    "video/3gpp2" : [".3g2"],
    "video/mpeg" : [".mp2", ".mpa", ".mpe", ".mpeg", ".mpg", ".mpv2"],
    "video/quicktime" : [".mov", ".qt"],
    "video/x-la-asf" : [".lsf", ".lsx"],
    "video/x-ms-asf" : [".asf", ".asr", ".asx"],
    "video/x-msvideo" : [".avi"],
    "video/x-sgi-movie" : [".movie"],
    "video/webm" : [".webm"],
    "x-world/x-vrml" : [".flr", ".vrml", ".wrl", ".wrz", ".wrz", ".xaf", ".xof"]
}

/**
 * 判断Mime列表是否存在。
 * @param mimes Mime类型列表
 */
export function hasExistsMimeType(...mimes : string[]) : boolean {
    for(let i = 0, len = mimes.length; i < len; i++) {
        var regex = new RegExp(`^(${mimes[i].replace("*", ".*").replace("/", "\/")})$`);
        if( mimes[i] === "*/*" ||  Object.keys(MimeMap).some((key) => regex.test(key))) {
            continue;
        }
        return false;
    }
    return true;
}

/**
 * 判断指定的文件是否在指定的Mime类型列表中
 * @param use 指定的Mime类型
 * @param ext 指定的扩展名
 * @param mimes Mime类型列表
 */
export function hasUseMimeType(use : string, ext : string, ...mimes : string[] ) : boolean {
    let regexs = mimes.map((mime) => new RegExp(`^(${mime.replace("*", ".*").replace("/", "\/")})$`));
    let isIncludeUse = regexs.some((regex) => regex.test(use));
    if(!isIncludeUse) 
        return false;
    let extList = getUseMimeExt(...mimes);
    return extList.indexOf(ext) > -1;
}

/**
 * 获取指定Mime类型的文件扩展名
 * @param mimes Mime类型列表
 */
export function getUseMimeExt(...mimes : string[]) : string[] {
    let result : string[] = [];
    let regexs = mimes.map((mime) => new RegExp(`^(${mime.replace("*", ".*").replace("/", "\/")})$`));
    for(let i = 0, len = Object.keys(MimeMap).length; i < len; i++) {
        if (regexs.some(it => it.test(Object.keys(MimeMap)[i]))) {
            result.push(...Object.values(MimeMap)[i])
        }
    }
    let unique = new Set<string>(result)
    return [...unique.values()];
}