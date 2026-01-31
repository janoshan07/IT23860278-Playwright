import { test, expect } from '@playwright/test';

// 35 Scenarios from your Excel
const scenarios = [
  { id: 'Pos_Fun_0001', input: 'Vanakkam, eppadi irukkeenga?', expected: 'வணக்கம், எப்படி இருக்கீங்க?' },
  { id: 'Pos_Fun_0002', input: 'Naan ippo saappiduren.', expected: 'நான் இப்போ சாப்பிடுறேன்.' },
  { id: 'Pos_Fun_0003', input: 'Naan naalaiikki Jaffna poven.', expected: 'நான் நாளைக்கு யாழ்ப்பாணம் போவேன்.' },
  { id: 'Pos_Fun_0004', input: 'Naan veettukku poren, aana ippo mazhai peiyuthu.', expected: 'நான் வீட்டுக்கு போறேன், ஆனா இப்போ மழை பெய்யுது.' },
  { id: 'Pos_Fun_0005', input: 'Enakku oru email anuppunga, Zoom link மேல இருக்கு.', expected: 'எனக்கு ஒரு email அனுப்புங்க, Zoom link மேல இருக்கு.' },
  { id: 'Pos_Fun_0006', input: 'Dhayavu seidhu enakku konjam udhavi seiya mudiyuma?', expected: 'தயவு செய்து எனக்கு கொஞ்சம் உதவி செய்ய முடியுமா?' },
  { id: 'Pos_Fun_0007', input: 'Nethu naan cinema parthen.', expected: 'நேத்து நான் சினிமா பார்த்தேன்.' },
  { id: 'Pos_Fun_0008', input: 'Avargal ellorum vanthaarkal.', expected: 'அவர்கள் எல்லோரும் வந்தார்கள்.' },
  { id: 'Pos_Fun_0009', input: 'Enakku adhu pidikkavillai.', expected: 'எனக்கு அது பிடிக்கவில்லை.' },
  { id: 'Pos_Fun_0010', input: 'Idhu Rs. 750 mattum thaan.', expected: 'இது Rs. 750 மட்டும் தான்.' },
  { id: 'Pos_Fun_0011', input: 'Ungal peyar enna?', expected: 'உங்கள் பெயர் என்ன?' },
  { id: 'Pos_Fun_0012', input: 'Seekkiram seekkiram vaanga.', expected: 'சீக்கிரம் சீக்கிரம் வாங்க.' },
  { id: 'Pos_Fun_0013', input: 'Nee varalaam endral naan varuven.', expected: 'நீ வரலாம் என்றால் நான் வருவேன்.' },
  { id: 'Pos_Fun_0014', input: 'Enakku nalla nidhimathayi.', expected: 'எனக்கு நல்ல தூக்கம் வருது.' },
  { id: 'Pos_Fun_0015', input: 'Angayae irunghal.', expected: 'அங்கேயே இருங்கள்.' },
  { id: 'Pos_Fun_0016', input: 'Seekkiramvaanga.', expected: 'சீக்கிரம் வாங்க.' },
  { id: 'Pos_Fun_0017', input: 'Ov, adhu sari thaan.', expected: 'ஓவ், அது சரி தான்.' },
  { id: 'Pos_Fun_0018', input: 'Office-la meeting irukku, so late-aa varuven.', expected: 'Office-ல meeting இருக்கு, so late-ஆ வருவேன்.' },
  { id: 'Pos_Fun_0019', input: 'Inniku USD rate enna?', expected: 'இன்னைக்கு USD rate என்ன?' },
  { id: 'Pos_Fun_0020', input: 'Jan 01, 2026 oru nalla naal.', expected: 'Jan 01, 2026 ஒரு நல்ல நாள்.' },
  { id: 'Pos_Fun_0021', input: 'Enakku 2 kg arisi venum.', expected: 'எனக்கு 2 kg அரிசி வேணும்.' },
  { id: 'Pos_Fun_0022', input: 'Enna nadakkuthu (teriyavillai)?', expected: 'என்ன நடக்குது (தெரியவில்லை)?' },
  { id: 'Pos_Fun_0023', input: 'Poddak inna, naan varen.', expected: 'பொத்தக் இன்ன, நான் வரேன்.' },
  { id: 'Pos_Fun_0024', input: 'Naan tamil karkiren.', expected: 'நான் தமிழ் கற்கிறேன்.' },
  { id: 'Pos_UI_0001', input: 'Amma varaanga', expected: 'அம்மா வராங்க' },
  { id: 'Neg_Fun_0001', input: 'Ennakku tamiil teriyu.', expected: 'எனக்கு தமிழ் தெரியும்.' },
  { id: 'Neg_Fun_0002', input: 'Ela machan, sema!', expected: 'ஏல மச்சான், செம!' },
  { id: 'Neg_Fun_0003', input: 'Naanveettukkuporen.', expected: 'நான் வீட்டுக்கு போறேன்.' },
  { id: 'Neg_Fun_0004', input: 'Cryptographic algorithm puriyala.', expected: 'Cryptographic algorithm புரியல.' },
  { id: 'Neg_Fun_0005', input: 'Enna ithu??!!', expected: 'என்ன இது??!!' },
  { id: 'Neg_Fun_0006', input: '10 + 20 = 30 thaan.', expected: '10 + 20 = 30 தான்.' },
  { id: 'Neg_Fun_0007', input: 'Long text input', expected: 'அவுட்புட் தாமதமாகலாம்.' },
  { id: 'Neg_Fun_0008', input: 'Naan go to home ippo.', expected: 'நான் வீட்டுக்கு போகிறேன் இப்போ.' },
  { id: 'Neg_Fun_0009', input: '@home irukken #tamil', expected: '@home இருக்கேன் #tamil' },
  { id: 'Neg_Fun_0010', input: '   ', expected: '' }
];

for (const scenario of scenarios) {
  test(`Scenario ${scenario.id}: ${scenario.input}`, async ({ page }) => {
    await page.goto('https://tamil.changathi.com/');
    const textArea = page.locator('#TLTextArea');
    await textArea.fill(scenario.input);
    await page.waitForTimeout(1000);
    const actualOutput = await textArea.inputValue();
    console.log(`ID: ${scenario.id} | Result: ${actualOutput}`);
  });
}