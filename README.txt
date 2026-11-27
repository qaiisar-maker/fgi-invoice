FGI INVOICE SYSTEM v18 — README
================================
Faisal Goraya Industry, Ali Pur Chattha | Tayyar: 15-11-2026 | v18.3: 22-11-2026 | v18.4/v18.5: 27-11-2026
Repo: github.com/qaiisar-maker/fgi-invoice (GitHub Pages)

v18.5 MEIN NAYA (27-11-2026)
  - Report page: 2 tab — "👤 Customer Report" aur "📅 Date wise Report".
  - Customer Report: customer ki saari invoices + saari payments (kis invoice par lagi),
    Report PDF (pehle preview) aur Report Image.  (Pehle customer kholne par page
    khali reh jata tha — yeh bug theek.)
  - Date wise: Aaj / Kal / Is hafte / Is mahine / Pichla mahina ya apni tareekh,
    optional customer. Invoices jo bani + payments jo aayi (kis invoice par) + Cash/Online total.
  - Upload: index.html, sw.js, README.txt, Test Report, aur lib/ mein 2 NAYI files:
    pdf.min.js aur pdf.worker.min.js (zaroor daalein).

v18.4 MEIN NAYA (27-11-2026)
  - Received Payment mein invoice select na ho to raqam customer ke BAQI balance se
    minus hoti hai (sab se purani invoice pehle). Advance sirf tab banta hai jab payment
    poore baqi se zyada ho — sirf zyada wala hissa. (Bombay Hardware: Baqi 137,247, Adv 0)
  - Invoice par haath se likhe bill ki photo (optional, max 3): Camera / Gallery.
    Photo app ke andar alag storage mein, chhoti (~200 KB) ho kar save hoti hai.
    List mein 📎 button se poori screen par dekhein (zoom). Backup mein shamil.
  - Upload: sirf index.html, sw.js, README.txt aur Test Report badle hain.

v18.3 MEIN NAYA (22-11-2026)
  - Invoice delete karne se khata (payments) ka record delete NAHI hota. Us invoice
    par mili payment khata mein rahti hai aur customer ka Advance ban jati hai
    (nayi invoice par khud "Less Advance" lag jata hai).
  - Khata > customer > "🗑 Khata khatam karein": us customer ki saari invoices +
    payments + advance delete. Pakka karne ke liye customer ka naam likhna hota hai.
  - Upload: sirf index.html, sw.js, README.txt aur Test Report badle hain.

1. ZIP KE ANDAR KYA HAI
-----------------------
  index.html        poori app (HTML + CSS + JS)
  sw.js             service worker  (CACHE = 'fgi-invoice-v18.5')
  manifest.json     asli manifest (install ke liye)
  lib/              sql-wasm.js, sql-wasm.wasm, html2canvas, jsPDF, autotable  (koi CDN nahi)
  fonts/            Barlow + Barlow Condensed (woff2) + fonts.css
  icons/            PNG icons 192/512 (+ maskable), apple-touch-icon, favicon
  README.txt, FGI_Invoice_v18_Test_Report.txt

2. GITHUB PAR UPLOAD (ZAROORI)
------------------------------
  1) Pehle purani app se Settings > Export / Backup karke JSON file mehfooz karein.
  2) GitHub repo > Add file > Upload files.
  3) ZIP kholein aur SAARI cheezein (index.html, sw.js, manifest.json, README.txt
     aur folders lib/, fonts/, icons/) MOUSE SE DRAG karke upload karein.
     Folders drag karna lazmi hai — warna offline / install / PDF toot jaye ga.
  4) Commit. 1-2 minute baad site kholein, page 1-2 dafa refresh karein.
  5) Purana data khud chalta rahe ga. Pehli dafa khulne par app purane data ka
     backup ("v18 se pehle ka backup") khud bana leti hai.

3. NAYA KYA HAI
---------------
  * Overpayment: invoice se zyada payment = status OVERPAID + "Customer Advance".
  * Received Payment (dashboard ka peela button): customer search, date, amount,
    Cash/Online/Cheque (+ JazzCash/EasyPaisa/Bank), ref / cheque no, invoice
    select (optional, multiple), allocation preview, phir Save.
  * Customer Advance agli NAYI invoice mein khud "Less Advance" ban kar minus hota hai
    (form mein checkbox se band bhi kar sakte hain).
  * Prev.Bal wali invoice (jaise FGI#65 mein FGI#53 + FGI#59) par payment pehle
    shamil purani invoices clear karti hai, phir nayi. Ab purani invoices list mein
    ghalat "Due" nahi dikhati aur Outstanding do dafa nahi ginta.
  * Naya HD invoice design (approved image jaisa), khud multi-page, "Page X of N",
    koi row do pages mein nahi kat'ti.
  * HD Image: har page ki alag PNG, 1440px chaudi (2x) — WhatsApp ke liye.
    Kai pages hon to har page ka alag Download / Share + "Share All".
  * PDF: vector (sharp) A4, har page par header + customer, page numbers,
    Payment History, Remaining / Overpayment / Paid status, poori bank details.
  * Khata: Total Billed, Total Received, Unpaid Invoices, Customer Advance,
    Net Balance alag alag. Har payment (dono tareeqon se) khud Khata mein.
  * 100% offline: libraries + fonts app ke andar.

4. PURANA DATA / MIGRATION
--------------------------
  * Koi purana record badla ya delete nahi hota. Sirf naye khaali columns add hote hain:
    payments: cust_name, ref_no, bank_name, alloc_json, source, uid
    invoices: credit_used
  * Balances, allocations aur advance har dafa saved invoices + payments se
    CALCULATE hote hain — is liye edit/delete se hisaab kabhi bigarta nahi.
  * Purani v4 backup JSON import hoti hai. Import se pehle current data ka backup khud
    banta hai (Settings > "Import se pehle ka data").

5. HISAAB KE RULES (aap ki manzoori se)
---------------------------------------
  * Payment = baqi            -> PAID / CLEARED
  * Payment < baqi            -> PARTIAL (remaining dikhaye)
  * Payment > baqi            -> OVERPAID, zyada raqam = Customer Advance
  * Invoice select na ho      -> poori raqam Customer Advance (koi invoice paid nahi)
  * Advance                   -> agli nayi invoice mein khud minus
  * Har customer ke liye:  Billed - Received = Unpaid - Advance  (test se confirm)
