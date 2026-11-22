import { createContext, useContext } from 'react'

export const dict = {
  en: {
    home: 'Home', about: 'About', projects: 'Projects', contact: 'Contact', menu: 'Menu', close: 'Close',
    dark: 'Dark', light: 'Light', themeLabel: 'Switch theme', langLabel: 'Switch language',
    first: 'Al-Moatasem', last: 'Awwad', t1: 'Front-end', t2: 'Developer', clock: 'Cairo time',
    cap: 'Independent product engineer and AI engineering student in Badr City, Egypt. I build software products, AI systems and unusual digital experiences.',
    stmt: 'I build products where the hard part is not generating something once, but making the system useful, intentional and reliable. I care about products that survive beyond the demo.',
    f1: ['Egyptian Russian University', 'Faculty of Artificial Intelligence'], f2: ['AppRo8 front-end internship', 'Since October 2026'], f3: ['Badr City, Egypt'],
    how: ['Start with the product problem.', 'Design the system, not just the screen.', 'Build for real use, not only the demo.', 'Refine until the result feels intentional.', 'Ship, then learn from what happens next.'],
    sel: 'Selected work', toolkit: 'Toolkit', viewp: 'Read the case study',
    tk: [['Frontend', 'TypeScript · React · Next.js · Vue · Three.js'], ['AI', 'Python · PyTorch · OpenCV · LLMs · Speech'], ['Backend', 'FastAPI · Flask · Node.js · PostgreSQL · MySQL'], ['Systems', 'REST · WebSockets · Docker · Git'], ['Product', 'Architecture · UX systems · Prototyping']],
    st: { live: 'Live', dev: 'In development', oss: 'Open source' },
    cs: { problem: 'The problem', built: 'What I built', flow: 'How it works', decisions: 'Decisions', status: 'Status', role: 'Role', roleV: 'Independent, design and engineering', stack: 'Stack', links: 'Links', live: 'Open the product', repo: 'Source on GitHub', next: 'Next project', all: 'All projects' },
    cta: 'Have a product in mind?', cta2: 'Let’s talk.', name: 'Name', email: 'Email', msg: 'Message', send: 'Send message',
    ok: 'Opening your email app with your message.', e_name: 'Enter your name.', e_email: 'Enter a valid email address, like name@example.com.', e_msg: 'Write at least 10 characters.',
    nf: 'Not found', nf2: 'This page doesn’t exist.', back: 'Back to home',
  },
  ar: {
    home: 'الرئيسية', about: 'نبذة', projects: 'المشاريع', contact: 'تواصل', menu: 'القائمة', close: 'إغلاق',
    dark: 'داكن', light: 'فاتح', themeLabel: 'تبديل المظهر', langLabel: 'تغيير اللغة',
    first: 'المعتصم', last: 'عوّاد', t1: 'مطوّر', t2: 'واجهات أمامية', clock: 'توقيت القاهرة',
    cap: 'مهندس منتجات مستقل وطالب هندسة ذكاء اصطناعي في مدينة بدر، مصر. أبني منتجات برمجية وأنظمة ذكاء اصطناعي وتجارب رقمية غير مألوفة.',
    stmt: 'أبني منتجات الصعب فيها ليس توليد شيء مرة واحدة، بل جعل النظام نافعاً ومقصوداً وموثوقاً. يهمّني المنتج الذي يعيش بعد العرض التجريبي.',
    f1: ['الجامعة المصرية الروسية', 'كلية الذكاء الاصطناعي'], f2: ['تدريب واجهات أمامية في AppRo8', 'منذ أكتوبر 2026'], f3: ['مدينة بدر، مصر'],
    how: ['ابدأ من مشكلة المنتج.', 'صمّم النظام لا الشاشة فقط.', 'ابنِ للاستخدام الحقيقي لا للعرض التجريبي فقط.', 'حسّن حتى تبدو النتيجة مقصودة.', 'أطلق، ثم تعلّم مما يحدث بعده.'],
    sel: 'أعمال مختارة', toolkit: 'الأدوات', viewp: 'اقرأ دراسة الحالة',
    tk: [['الواجهات', 'TypeScript · React · Next.js · Vue · Three.js'], ['الذكاء الاصطناعي', 'Python · PyTorch · OpenCV · LLMs · Speech'], ['الخلفية', 'FastAPI · Flask · Node.js · PostgreSQL · MySQL'], ['الأنظمة', 'REST · WebSockets · Docker · Git'], ['المنتج', 'Architecture · UX systems · Prototyping']],
    st: { live: 'متاح الآن', dev: 'قيد التطوير', oss: 'مفتوح المصدر' },
    cs: { problem: 'المشكلة', built: 'ما بنيته', flow: 'كيف يعمل', decisions: 'قرارات', status: 'الحالة', role: 'الدور', roleV: 'مستقل، تصميم وهندسة', stack: 'التقنيات', links: 'روابط', live: 'افتح المنتج', repo: 'الكود على GitHub', next: 'المشروع التالي', all: 'كل المشاريع' },
    cta: 'عندك منتج في بالك؟', cta2: 'لنتحدث.', name: 'الاسم', email: 'البريد الإلكتروني', msg: 'الرسالة', send: 'إرسال',
    ok: 'نفتح تطبيق البريد برسالتك.', e_name: 'أدخل اسمك.', e_email: 'أدخل بريداً إلكترونياً صحيحاً مثل name@example.com.', e_msg: 'اكتب 10 أحرف على الأقل.',
    nf: 'غير موجودة', nf2: 'هذه الصفحة غير موجودة.', back: 'العودة للرئيسية',
  },
}
export const Lang = createContext({ t: dict.en, lang: 'en', go: () => {} })
export const useT = () => useContext(Lang)
