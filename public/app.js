/* ===================== DATA ===================== */
const AREAS=[
 {id:'chest',he:'חזה'},{id:'back',he:'גב'},{id:'shoulders',he:'כתפיים'},
 {id:'biceps',he:'יד קדמית'},{id:'triceps',he:'יד אחורית'},{id:'legs',he:'רגליים וישבן'},{id:'core',he:'בטן'}];
const AREA_HE=Object.fromEntries(AREAS.map(a=>[a.id,a.he]));
const EQ={mt:'מולטי טריינר',bench:'ספסל',db:'משקולות יד',bw:'משקל גוף'};
// k: c=compound i=isolation ; type: w=weight bw=bodyweight time=seconds
const EX=[
 {id:'db-bench',he:'לחיצת חזה במשקולות יד',en:'dumbbell bench press',a:'chest',k:'c',eq:['bench','db'],p:'press',type:'w',mus:'חזה, כתף קדמית, יד אחורית',
  cues:['שכב עם כפות רגליים יציבות על הרצפה ושכמות מכווצות לספסל','הורד את המשקולות בשליטה עד גובה החזה, מרפקים בזווית של כ-45° מהגוף','דחוף למעלה ומעט פנימה עד כמעט יישור, בלי לנעול מרפקים'],
  err:['הרמת האגן מהספסל וקשת גב מוגזמת','מרפקים פתוחים ב-90° לצדדים, עומס מיותר על הכתף']},
 {id:'db-incline',he:'לחיצת חזה בשיפוע עליון',en:'incline dumbbell press',a:'chest',k:'c',eq:['bench','db'],p:'incline',type:'w',mus:'חזה עליון, כתף קדמית',
  cues:['כוון את הספסל לשיפוע של 30°–45°','הורד את המשקולות עד החזה העליון','דחוף למעלה בקו מעל הכתפיים, נשיפה בדחיפה'],
  err:['שיפוע גבוה מדי שמעביר את העבודה לכתפיים','הקפצת המשקולות מהחזה']},
 {id:'db-fly',he:'פרפר במשקולות על ספסל',en:'dumbbell chest fly',a:'chest',k:'i',eq:['bench','db'],p:'fly',type:'w',mus:'חזה',
  cues:['מרפקים כפופים מעט וקבועים לאורך כל התנועה','פתח בקשת רחבה עד מתיחה נוחה בחזה','סגור את הזרועות כאילו אתה מחבק עץ'],
  err:['יישור מלא של המרפקים','ירידה עמוקה מדי שמעמיסה על מפרק הכתף']},
 {id:'mt-chest',he:'לחיצת חזה במולטי טריינר',en:'machine chest press',a:'chest',k:'c',eq:['mt'],p:'mpress',type:'w',mus:'חזה, יד אחורית',
  cues:['כוון את המושב כך שהידיות בגובה אמצע החזה','גב צמוד למשענת לאורך כל הסט','דחוף בנשיפה וחזור לאט, 2–3 שניות'],
  err:['הרמת כתפיים לכיוון האוזניים','חזרה מהירה שבה לוחות המשקל נוחתים זה על זה']},
 {id:'mt-cross',he:'קרוס אובר בכבלים',en:'cable crossover',a:'chest',k:'i',eq:['mt'],p:'cross',type:'w',mus:'חזה פנימי ותחתון',
  cues:['עמוד בפיסוק קל וגוף נטוי מעט קדימה','משוך את הידיות בקשת עד שהן נפגשות מול הבטן','החזק שנייה בכיווץ וחזור לאט'],
  err:['משיכה בכוח הגב במקום בחזה','משקל כבד מדי שמכריח לכופף מרפקים']},
 {id:'pushup',he:'שכיבות סמיכה',en:'push up',a:'chest',k:'c',eq:['bw'],p:'pushup',type:'bw',mus:'חזה, יד אחורית, ליבה',
  cues:['ידיים מעט רחבות מהכתפיים, גוף בקו ישר מהראש לעקבים','רד עד שהחזה כמעט נוגע ברצפה','דחוף חזרה ושמור על בטן ועכוז מכווצים'],
  err:['אגן שוקע או מורם','ראש שנוטה קדימה לפני הגוף']},
 {id:'db-pullover',he:'פולאובר במשקולת',en:'dumbbell pullover',a:'chest',k:'i',eq:['bench','db'],p:'pullover',type:'w',mus:'חזה, רחב גבי',
  cues:['אחוז משקולת אחת בשתי הידיים מעל החזה','הורד לאחור מעל הראש עם מרפקים כפופים מעט','החזר בקשת עד מעל החזה'],
  err:['ירידה מעבר לטווח הנוח לכתף','קשת גב תחתון']},
 {id:'mt-pulldown',he:'פולי עליון',en:'lat pulldown',a:'back',k:'c',eq:['mt'],p:'pulldown',type:'w',mus:'רחב גבי, יד קדמית',
  cues:['אחיזה מעט רחבה מהכתפיים, ירכיים נעולות מתחת לכרית','משוך את המוט לחזה העליון תוך הורדת השכמות','חזור לאט עד יישור מלא של הידיים'],
  err:['נדנוד הגוף לאחור לצבירת תנופה','משיכה מאחורי הראש']},
 {id:'mt-row',he:'חתירה בכבל בישיבה',en:'seated cable row',a:'back',k:'c',eq:['mt'],p:'crow',type:'w',mus:'גב אמצעי, רחב גבי',
  cues:['ישב זקוף עם ברכיים כפופות מעט','משוך את הידית לבטן ולחץ שכמות זו לזו','חזור קדימה בשליטה ותן לשכמות להימתח'],
  err:['עיגול הגב התחתון','משיכה בכוח נדנוד הגוף']},
 {id:'db-row',he:'חתירה ביד אחת',en:'one arm dumbbell row',a:'back',k:'c',eq:['bench','db'],p:'dbrow',type:'w',mus:'רחב גבי, גב אמצעי',
  cues:['ברך ויד באותו צד על הספסל, גב ישר ומקביל לרצפה','משוך את המשקולת לכיוון המותן, מרפק צמוד לגוף','הורד לאט עד יישור מלא'],
  err:['סיבוב הגוף כדי להרים','משיכה לכיוון הכתף במקום המותן']},
 {id:'mt-straight',he:'פולי בידיים ישרות',en:'straight arm cable pulldown',a:'back',k:'i',eq:['mt'],p:'straight',type:'w',mus:'רחב גבי',
  cues:['עמוד מול הכבל עם הטיה קלה קדימה','ידיים כמעט ישרות, משוך בקשת עד הירכיים','חזור לאט עד גובה הראש'],
  err:['כיפוף מרפקים והפיכת התרגיל לפשיטה','נדנוד הגוף']},
 {id:'mt-facepull',he:'פייס פול',en:'cable face pull',a:'back',k:'i',eq:['mt'],p:'facepull',type:'w',mus:'כתף אחורית, גב עליון',
  cues:['כבל בגובה הפנים, אחיזה בחבל או בידית','משוך לכיוון הפנים עם מרפקים גבוהים ופתוחים','סובב את הידיים החוצה בסוף התנועה'],
  err:['מרפקים נמוכים','משקל כבד שגורם להטיה לאחור']},
 {id:'db-ohp',he:'לחיצת כתפיים בישיבה',en:'seated dumbbell shoulder press',a:'shoulders',k:'c',eq:['bench','db'],p:'ohp',type:'w',mus:'כתפיים, יד אחורית',
  cues:['ספסל זקוף, גב צמוד למשענת','התחל עם משקולות בגובה האוזניים','דחוף למעלה עד כמעט יישור והורד בשליטה'],
  err:['קשת בגב התחתון','ירידה חלקית בלבד']},
 {id:'db-lateral',he:'הרחקה לצדדים',en:'dumbbell lateral raise',a:'shoulders',k:'i',eq:['db'],p:'lateral',type:'w',mus:'כתף אמצעית',
  cues:['מרפקים כפופים מעט','הרם לצדדים עד גובה הכתפיים, מרפק מוביל','הורד לאט, 2–3 שניות'],
  err:['תנופה מהגוף','הרמה מעל קו הכתף עם הרמת טרפז']},
 {id:'db-front',he:'הרמה קדמית',en:'dumbbell front raise',a:'shoulders',k:'i',eq:['db'],p:'front',type:'w',mus:'כתף קדמית',
  cues:['עמוד יציב עם בטן אסופה','הרם קדימה עד גובה העיניים','הורד בשליטה'],
  err:['נטייה לאחור','שימוש בתנופה']},
 {id:'db-rear',he:'פרפר אחורי בהטיה',en:'bent over rear delt fly',a:'shoulders',k:'i',eq:['db'],p:'rear',type:'w',mus:'כתף אחורית, גב עליון',
  cues:['הטה את הגוף קדימה עם גב ישר','פתח את הידיים לצדדים עם מרפקים כפופים מעט','כווץ את גב הכתף בשיא התנועה'],
  err:['משקל כבד מדי','הרמת הגוף במקום הידיים']},
 {id:'db-curl',he:'כפיפת מרפקים במשקולות',en:'dumbbell biceps curl',a:'biceps',k:'i',eq:['db'],p:'curl',type:'w',mus:'יד קדמית',
  cues:['מרפקים צמודים לגוף','כופף עד כיווץ מלא וסובב את כף היד כלפי מעלה','הורד לאט עד יישור מלא'],
  err:['נדנוד הגוף','מרפקים שזזים קדימה']},
 {id:'db-hammer',he:'כפיפת פטישים',en:'hammer curl',a:'biceps',k:'i',eq:['db'],p:'curl',type:'w',mus:'יד קדמית, אמה',
  cues:['אחיזה ניטרלית, כפות ידיים זו מול זו','כופף בלי לסובב את כף היד','הורד בשליטה'],
  err:['תנופה','קיצור הטווח בתחתית']},
 {id:'mt-curl',he:'כפיפת מרפקים בכבל',en:'cable biceps curl',a:'biceps',k:'i',eq:['mt'],p:'ccurl',type:'w',mus:'יד קדמית',
  cues:['כבל בגלגלת התחתונה, עמוד קרוב','כופף עם מרפקים קבועים לצד הגוף','החזק שנייה למעלה וחזור לאט'],
  err:['הטיית הגוף לאחור','מרפקים שעולים קדימה']},
 {id:'db-conc',he:'כפיפת ריכוז',en:'concentration curl',a:'biceps',k:'i',eq:['bench','db'],p:'curl',type:'w',mus:'יד קדמית',
  cues:['שב על הספסל, מרפק נשען על פנים הירך','כופף לאט עד כיווץ מלא','הורד עד יישור מלא'],
  err:['הרחקת המרפק מהירך','עבודה מהירה מדי']},
 {id:'mt-pushdown',he:'פשיטת מרפקים בכבל',en:'triceps pushdown',a:'triceps',k:'i',eq:['mt'],p:'pushdown',type:'w',mus:'יד אחורית',
  cues:['מרפקים צמודים לגוף וקבועים','דחוף למטה עד יישור מלא','חזור עד זווית של 90° בלבד'],
  err:['מרפקים שזזים קדימה ואחורה','הטיית הגוף מעל הכבל']},
 {id:'db-overhead',he:'פשיטת מרפקים מעל הראש',en:'overhead dumbbell triceps extension',a:'triceps',k:'i',eq:['db'],p:'overhead',type:'w',mus:'יד אחורית (ראש ארוך)',
  cues:['אחוז משקולת בשתי ידיים מעל הראש','הורד מאחורי הראש עם מרפקים מכוונים קדימה','פשוט עד יישור מלא'],
  err:['מרפקים נפתחים לצדדים','קשת בגב התחתון']},
 {id:'db-kick',he:'קיקבק במשקולת',en:'dumbbell triceps kickback',a:'triceps',k:'i',eq:['bench','db'],p:'kickback',type:'w',mus:'יד אחורית',
  cues:['הטה את הגוף קדימה, זרוע עליונה מקבילה לרצפה','פשוט את המרפק לאחור עד יישור מלא','חזור לאט ל-90°'],
  err:['הנפת כל הזרוע','זרוע עליונה שיורדת']},
 {id:'pushup-close',he:'שכיבות סמיכה צרות',en:'close grip push up',a:'triceps',k:'c',eq:['bw'],p:'pushup',type:'bw',mus:'יד אחורית, חזה',
  cues:['כפות ידיים מתחת לכתפיים או צרות יותר','מרפקים צמודים לגוף בירידה','גוף בקו ישר'],
  err:['מרפקים שנפתחים החוצה','אגן שוקע']},
 {id:'db-goblet',he:'סקוואט גביע',en:'goblet squat',a:'legs',k:'c',eq:['db'],p:'squat',type:'w',mus:'ארבע ראשי, ישבן',
  cues:['אחוז משקולת אנכית מול החזה','רד לאחור ולמטה עד שהירכיים מקבילות לרצפה, חזה זקוף','דחוף דרך אמצע כף הרגל וחזור לעמידה'],
  err:['ברכיים שקורסות פנימה','עקבים שמתרוממים מהרצפה']},
 {id:'db-lunge',he:'לאנג׳ים במשקולות',en:'dumbbell lunges',a:'legs',k:'c',eq:['db'],p:'lunge',type:'w',mus:'ארבע ראשי, ישבן',
  cues:['צעד ארוך קדימה, גוף זקוף','רד עד שהברך האחורית כמעט נוגעת ברצפה','דחוף דרך העקב הקדמי וחזור'],
  err:['ברך קדמית שקורסת פנימה','צעד קצר מדי']},
 {id:'db-bulg',he:'סקוואט בולגרי',en:'bulgarian split squat',a:'legs',k:'c',eq:['bench','db'],p:'bulgarian',type:'w',mus:'ארבע ראשי, ישבן',
  cues:['כף הרגל האחורית על הספסל','רד אנכית עד שהירך הקדמית מקבילה לרצפה','דחוף דרך הרגל הקדמית בלבד'],
  err:['עמידה קרובה מדי לספסל','הישענות על הרגל האחורית']},
 {id:'db-step',he:'עליות על ספסל',en:'dumbbell step up',a:'legs',k:'c',eq:['bench','db'],p:'stepup',type:'w',mus:'ארבע ראשי, ישבן',
  cues:['כף רגל שלמה על הספסל','עלה בכוח הרגל העליונה בלבד','רד בשליטה'],
  err:['דחיפה מהרגל התחתונה','ברך שקורסת פנימה']},
 {id:'mt-legext',he:'פשיטת ברכיים',en:'leg extension machine',a:'legs',k:'i',eq:['mt'],p:'legext',type:'w',mus:'ארבע ראשי',
  cues:['ברכיים מיושרות עם ציר המכונה, כרית מעל הקרסול','פשוט עד יישור מלא והחזק שנייה','הורד לאט'],
  err:['בעיטה מהירה','הרמת האגן מהמושב']},
 {id:'mt-legcurl',he:'כפיפת ברכיים',en:'lying leg curl machine',a:'legs',k:'i',eq:['mt'],p:'legcurl',type:'w',mus:'המסטרינג',
  cues:['אגן צמוד לספסל','כופף את הברכיים עד כיווץ מלא','חזור לאט עד כמעט יישור'],
  err:['הרמת האגן','תנופה']},
 {id:'db-rdl',he:'דדליפט רומני במשקולות',en:'dumbbell romanian deadlift',a:'legs',k:'c',eq:['db'],p:'rdl',type:'w',mus:'המסטרינג, ישבן, גב תחתון',
  cues:['ברכיים כפופות מעט וקבועות','דחוף את האגן לאחור והורד את המשקולות צמוד לרגליים','חזור בכיווץ ישבן, גב ישר לאורך כל התנועה'],
  err:['עיגול הגב','כיפוף ברכיים שהופך את התרגיל לסקוואט']},
 {id:'db-bridge',he:'גשר ישבן במשקולת',en:'dumbbell glute bridge',a:'legs',k:'c',eq:['db'],p:'bridge',type:'w',mus:'ישבן, המסטרינג',
  cues:['שכב על הגב, משקולת על האגן, כפות רגליים קרובות לישבן','הרם את האגן עד קו ישר מהברכיים לכתפיים','החזק שנייה בכיווץ והורד'],
  err:['קשת בגב התחתון במקום עבודת ישבן','דחיפה מהבהונות']},
 {id:'db-calf',he:'עליות תאומים',en:'standing calf raise dumbbell',a:'legs',k:'i',eq:['db'],p:'calf',type:'w',mus:'תאומים',
  cues:['עמוד על קצות האצבעות, אפשר על מדרגה','עלה גבוה ככל האפשר והחזק שנייה','רד עד מתיחה מלאה'],
  err:['קפיצות קטנות','טווח חלקי']},
 {id:'crunch',he:'כפיפות בטן',en:'crunches',a:'core',k:'i',eq:['bw'],p:'crunch',type:'bw',mus:'בטן ישרה',
  cues:['ברכיים כפופות, גב תחתון צמוד לרצפה','הרם את השכמות בעזרת שרירי הבטן','נשוף בעלייה'],
  err:['משיכת הצוואר עם הידיים','תנופה']},
 {id:'plank',he:'פלאנק',en:'plank',a:'core',k:'i',eq:['bw'],p:'plank',type:'time',mus:'ליבה',
  cues:['מרפקים מתחת לכתפיים','גוף בקו ישר, ישבן ובטן מכווצים','נשימה רגילה לאורך כל הזמן'],
  err:['אגן שוקע','ישבן גבוה מדי']},
 {id:'leg-raise',he:'הרמות רגליים בשכיבה',en:'lying leg raises',a:'core',k:'i',eq:['bw','bench'],p:'legraise',type:'bw',mus:'בטן תחתונה',
  cues:['שכב על הגב, ידיים לצד הגוף או אוחזות בספסל','הרם רגליים ישרות עד 90°','הורד לאט בלי לגעת ברצפה'],
  err:['קשת בגב התחתון','ירידה מהירה']},
 {id:'twist',he:'טוויסט רוסי',en:'russian twist',a:'core',k:'i',eq:['db','bw'],p:'twist',type:'bw',mus:'אלכסוניים',
  cues:['שב בהטיה לאחור עם גב ישר','סובב את הגוף מצד לצד, משקולת לצד האגן','כל צד נספר כחזרה'],
  err:['סיבוב של הידיים בלבד','עיגול הגב']},
 {id:'mt-crunch',he:'כפיפת בטן בכבל בכריעה',en:'kneeling cable crunch',a:'core',k:'i',eq:['mt'],p:'ccrunch',type:'w',mus:'בטן ישרה',
  cues:['כרע מול הכבל, ידיות ליד הראש','כופף את הגב העליון לכיוון הברכיים','האגן נשאר במקום'],
  err:['ישיבה לאחור על העקבים','משיכה בידיים']},
 {id:'mountain',he:'מטפס הרים',en:'mountain climbers',a:'core',k:'i',eq:['bw'],p:'mountain',type:'time',mus:'ליבה, קרדיו',
  cues:['תנוחת שכיבת סמיכה, ידיים מתחת לכתפיים','הבא ברך לחזה לסירוגין בקצב מהיר','אגן נמוך ויציב'],
  err:['אגן גבוה','כתפיים שזזות אחורה']}
];
const EXM=Object.fromEntries(EX.map(e=>[e.id,e]));
const X=(id,he,en,a,k,eq,p,type,mus,cues,err,mu)=>({id,he,en,a,k,eq,p,type,mus,cues,err,mu});
const MORE=[
 X('db-squeeze','לחיצת חזה צמודה','dumbbell squeeze press','chest','c',['bench','db'],'press','w','חזה פנימי, יד אחורית',['הצמד את המשקולות זו לזו מעל החזה','לחץ אותן אחת לשנייה לאורך כל התנועה','הורד לחזה ודחוף חזרה בלי להפריד'],['הפרדת המשקולות באמצע','מרפקים פתוחים לצדדים'],[['chest','triceps'],['delts_f']]),
 X('db-incfly','פרפר בשיפוע עליון','incline dumbbell fly','chest','i',['bench','db'],'fly','w','חזה עליון',['ספסל ב-30°','פתח בקשת רחבה עם מרפקים כפופים מעט','סגור מעל החזה העליון'],['ירידה עמוקה מדי','יישור מרפקים'],[['chest'],['delts_f']]),
 X('mt-crosslow','קרוס אובר מלמטה למעלה','low to high cable fly','chest','i',['mt'],'cross','w','חזה עליון',['כבלים בגלגלת התחתונה','הרם בקשת עד גובה הסנטר','כווץ את החזה העליון למעלה'],['משיכה בכתפיים','נטייה לאחור'],[['chest'],['delts_f']]),
 X('pushup-inc','שכיבות סמיכה בשיפוע','incline push up on bench','chest','c',['bw','bench'],'pushup','bw','חזה תחתון, יד אחורית',['ידיים על הספסל, גוף בקו ישר','רד עד שהחזה נוגע בספסל','דחוף חזרה'],['אגן שוקע','ראש קדימה'],[['chest'],['triceps','delts_f']]),
 X('pushup-dec','שכיבות סמיכה רגליים על ספסל','decline push up','chest','c',['bw','bench'],'pushup','bw','חזה עליון, כתפיים',['כפות רגליים על הספסל','ידיים ברוחב כתפיים','רד בשליטה ודחוף'],['קשת בגב התחתון','ירידה חלקית'],[['chest','delts_f'],['triceps']]),
 X('mt-press1','לחיצת חזה בכבל ביד אחת','single arm cable chest press','chest','i',['mt'],'mpress','w','חזה, ליבה',['עמוד בגב לכבל בפיסוק','דחוף קדימה ביד אחת בלי לסובב את הגוף','חזור לאט'],['סיבוב הגוף','מרפק גבוה מדי'],[['chest'],['abs','obliques']]),
 X('mt-pd-close','פולי עליון אחיזה צרה','close grip lat pulldown','back','c',['mt'],'pulldown','w','רחב גבי תחתון',['ידית משולשת או צרה','משוך לחזה התחתון','מרפקים צמודים לגוף'],['נדנוד','קיצור טווח למעלה'],[['lats'],['biceps','midback']]),
 X('mt-pd-rev','פולי עליון אחיזה הפוכה','reverse grip lat pulldown','back','c',['mt'],'pulldown','w','רחב גבי, יד קדמית',['כפות ידיים כלפיך, ברוחב כתפיים','משוך לחזה העליון','הורד שכמות למטה'],['משיכה בידיים בלבד','נטייה לאחור'],[['lats','biceps'],['midback']]),
 X('mt-row-wide','חתירה בכבל אחיזה רחבה','wide grip seated cable row','back','c',['mt'],'crow','w','גב עליון, כתף אחורית',['מוט רחב, מרפקים בגובה הכתפיים','משוך לחזה העליון','לחץ שכמות'],['הרמת כתפיים','עיגול גב'],[['midback','delts_r'],['traps','biceps']]),
 X('db-bentrow','חתירה בהטיה בשתי ידיים','bent over dumbbell row','back','c',['db'],'bentrow','w','רחב גבי, גב אמצעי',['הטיה של 45° עם גב ישר','משוך את המשקולות למותניים','הורד לאט'],['עיגול גב','קימה עם כל חזרה'],[['lats','midback'],['biceps','lowback']]),
 X('db-csrow','חתירה בשכיבה על ספסל משופע','chest supported dumbbell row','back','c',['bench','db'],'csrow','w','גב אמצעי',['שכב על הבטן על ספסל ב-30°','משוך משקולות למותניים','לחץ שכמות בשיא'],['הרמת החזה מהספסל','משיכה בכתפיים'],[['midback','lats'],['delts_r','biceps']]),
 X('superman','סופרמן','superman exercise','back','i',['bw'],'superman','bw','גב תחתון, ישבן',['שכב על הבטן, ידיים קדימה','הרם ידיים ורגליים יחד','החזק שנייה ורד'],['הרמת הראש למעלה','תנועה מהירה'],[['lowback'],['glutes','hams']]),
 X('db-shrug','משיכות כתפיים','dumbbell shrug','back','i',['db'],'shrug','w','טרפז',['עמוד זקוף, משקולות לצד הגוף','הרם כתפיים לאוזניים','החזק שנייה ורד לאט'],['גלגול כתפיים','כיפוף מרפקים'],[['traps'],['forearms']]),
 X('db-arnold','לחיצת ארנולד','arnold press','shoulders','c',['bench','db'],'ohp','w','כתפיים',['התחל עם כפות ידיים כלפיך מול הפנים','סובב החוצה תוך כדי דחיפה','חזור באותו מסלול'],['קשת בגב','תנועה מהירה'],[['delts_f','delts_s'],['triceps']]),
 X('mt-lateral','הרחקה לצדדים בכבל','cable lateral raise','shoulders','i',['mt'],'lateral','w','כתף אמצעית',['כבל תחתון, יד רחוקה מהמכשיר','הרם לצד עד גובה הכתף','הורד לאט'],['הרמת טרפז','תנופה'],[['delts_s'],['traps']]),
 X('db-upright','חתירה אנכית','dumbbell upright row','shoulders','i',['db'],'upright','w','כתף אמצעית, טרפז',['משקולות מול הירכיים','משוך למעלה עם מרפקים מובילים עד גובה החזה','הורד לאט'],['משיכה גבוהה מדי','אחיזה צרה מדי'],[['delts_s','traps'],['biceps']]),
 X('pike','שכיבות סמיכה פייק','pike push up','shoulders','c',['bw'],'pushup','bw','כתפיים, יד אחורית',['אגן גבוה, גוף בצורת V הפוכה','הורד את הראש בין הידיים','דחוף חזרה'],['אגן נמוך','מרפקים נפתחים'],[['delts_f'],['triceps']]),
 X('db-inccurl','כפיפה בישיבה בשיפוע','incline dumbbell curl','biceps','i',['bench','db'],'curl','w','יד קדמית (ראש ארוך)',['ספסל ב-45°, ידיים תלויות','כופף בלי להזיז מרפקים','הורד עד מתיחה מלאה'],['מרפקים זזים קדימה','קיצור טווח'],[['biceps'],[]]),
 X('mt-rope','כפיפת פטישים בחבל','cable rope hammer curl','biceps','i',['mt'],'ccurl','w','יד קדמית, אמה',['חבל בגלגלת התחתונה','כופף באחיזה ניטרלית','החזק שנייה למעלה'],['נדנוד','מרפקים קדימה'],[['biceps','forearms'],[]]),
 X('db-zott','כפיפת זוטמן','zottman curl','biceps','i',['db'],'curl','w','יד קדמית, אמות',['עלה עם כפות ידיים למעלה','סובב כפות ידיים למטה בשיא','רד לאט באחיזה עליונה'],['ירידה מהירה','תנופה'],[['biceps','forearms'],[]]),
 X('mt-ohext','פשיטה מעל הראש בכבל','overhead cable triceps extension','triceps','i',['mt'],'overhead','w','יד אחורית (ראש ארוך)',['גב לכבל, חבל מאחורי הראש','פשוט קדימה ומעלה','חזור עד מתיחה'],['מרפקים נפתחים','קשת בגב'],[['triceps'],[]]),
 X('db-skull','סקל קראשר במשקולות','dumbbell skull crusher','triceps','i',['bench','db'],'skull','w','יד אחורית',['שכב, ידיים ישרות מעל הכתפיים','כופף מרפקים והורד ליד הראש','פשוט חזרה'],['מרפקים זזים','ירידה מהירה'],[['triceps'],[]]),
 X('bench-dip','מקבילים על ספסל','bench dips','triceps','c',['bench','bw'],'dip','bw','יד אחורית, חזה',['ידיים על קצה הספסל מאחוריך','רד עד זווית של 90° במרפקים','דחוף חזרה'],['ירידה עמוקה מדי לכתף','הרחקת הגוף מהספסל'],[['triceps'],['chest','delts_f']]),
 X('db-sumo','סקוואט סומו','dumbbell sumo squat','legs','c',['db'],'squat','w','ישבן, מקרבים, ארבע ראשי',['פיסוק רחב, אצבעות החוצה','רד אנכית עם משקולת בין הרגליים','דחוף דרך העקבים'],['ברכיים קורסות פנימה','נטייה קדימה'],[['glutes','quads','adductors'],['hams']]),
 X('db-revlunge','לאנג׳ים לאחור','dumbbell reverse lunge','legs','c',['db'],'lunge','w','ישבן, ארבע ראשי',['צעד ארוך לאחור','רד עד שהברך האחורית כמעט נוגעת','חזור בדחיפה מהרגל הקדמית'],['צעד קצר','גב מתעגל'],[['glutes','quads'],['hams']]),
 X('mt-legext1','פשיטת ברכיים ברגל אחת','single leg extension','legs','i',['mt'],'legext','w','ארבע ראשי',['רגל אחת בכל פעם','פשוט והחזק שנייה','הורד לאט'],['תנופה','הרמת אגן'],[['quads'],[]]),
 X('db-slrdl','דדליפט רומני ברגל אחת','single leg romanian deadlift','legs','c',['db'],'rdl','w','המסטרינג, ישבן, יציבות',['עמוד על רגל אחת, ברך רכה','הטה קדימה כשהרגל השנייה עולה לאחור','חזור בכיווץ ישבן'],['סיבוב האגן','עיגול גב'],[['hams','glutes'],['lowback']]),
 X('hip-thrust','היפ תראסט על ספסל','dumbbell hip thrust','legs','c',['bench','db'],'bridge','w','ישבן',['גב עליון על הספסל, משקולת על האגן','דחוף אגן למעלה עד קו ישר','החזק שנייה בכיווץ'],['קשת בגב','דחיפה מהבהונות'],[['glutes'],['hams']]),
 X('wall-sit','ישיבה על קיר','wall sit','legs','i',['bw'],'wallsit','time','ארבע ראשי',['גב צמוד לקיר','ירכיים מקבילות לרצפה','ברכיים מעל הקרסוליים'],['ברכיים מעבר לאצבעות','ידיים על הירכיים'],[['quads'],['glutes']]),
 X('jump-squat','קפיצות סקוואט','jump squat','legs','c',['bw'],'squat','bw','ארבע ראשי, ישבן, כוח מתפרץ',['רד לסקוואט חלקי','קפוץ בפיצוץ','נחת רך על אמצע כף הרגל'],['נחיתה על עקבים','ברכיים קורסות פנימה'],[['quads','glutes'],['calves']]),
 X('db-calfseat','תאומים בישיבה','seated dumbbell calf raise','legs','i',['bench','db'],'calfseat','w','תאומים (סולאוס)',['שב, משקולת על הברכיים','הרם עקבים גבוה','רד עד מתיחה'],['טווח חלקי','קפיצות'],[['calves'],[]]),
 X('mt-kickback','בעיטת ישבן בכבל','cable glute kickback','legs','i',['mt'],'kickglute','w','ישבן',['רצועה בקרסול, הטיה קלה קדימה','בעט לאחור עם רגל ישרה','החזק שנייה וחזור'],['קשת בגב','סיבוב האגן'],[['glutes'],['hams']]),
 X('side-plank','פלאנק צידי','side plank','core','i',['bw'],'plank','time','אלכסוניים',['מרפק מתחת לכתף','אגן מורם בקו ישר','החלף צד'],['אגן שוקע','כתף קורסת'],[['obliques'],['abs']]),
 X('dead-bug','דד באג','dead bug','core','i',['bw'],'deadbug','bw','בטן עמוקה',['גב תחתון צמוד לרצפה','הושט יד ורגל נגדית','חזור והחלף צד'],['גב מתרומם','תנועה מהירה'],[['abs'],[]]),
 X('bicycle','כפיפות אופניים','bicycle crunch','core','i',['bw'],'bicycle','bw','אלכסוניים, בטן',['ידיים ליד הראש','מרפק לברך נגדית','רגל שנייה ישרה'],['משיכת צוואר','מהירות במקום שליטה'],[['obliques','abs'],[]]),
 X('mt-chop','חוטב עצים בכבל','cable woodchopper','core','i',['mt'],'woodchop','w','אלכסוניים',['כבל עליון, עמידה בצד','משוך באלכסון למטה לצד השני','סובב דרך הגו והאגן'],['משיכה בידיים בלבד','גב מתעגל'],[['obliques'],['abs','delts_f']]),
 X('hollow','החזקת הולו','hollow body hold','core','i',['bw'],'hollow','time','בטן',['שכב, גב תחתון צמוד','הרם כתפיים ורגליים ישרות','החזק ונשום'],['גב תחתון מתרומם','צוואר מתוח'],[['abs'],['obliques']]),
 X('rev-crunch','כפיפות בטן הפוכות','reverse crunch','core','i',['bw','bench'],'revcrunch','bw','בטן תחתונה',['ברכיים כפופות 90°','גלגל אגן לכיוון החזה','רד לאט'],['תנופה','רגליים נופלות'],[['abs'],[]])
];
const BASE_N=EX.length+MORE.length;
EX.push(...MORE);MORE.forEach(e=>EXM[e.id]=e);
const MUS={chest:'חזה',delts_f:'כתף קדמית',delts_s:'כתף אמצעית',delts_r:'כתף אחורית',biceps:'יד קדמית',triceps:'יד אחורית',forearms:'אמות',abs:'בטן ישרה',obliques:'אלכסוניים',traps:'טרפז',lats:'רחב גבי',midback:'גב אמצעי',lowback:'גב תחתון',glutes:'ישבן',quads:'ארבע ראשי',hams:'המסטרינג',calves:'תאומים',adductors:'מקרבים'};
const MU={'db-bench':[['chest'],['delts_f','triceps']],'db-incline':[['chest','delts_f'],['triceps']],'db-fly':[['chest'],['delts_f']],'mt-chest':[['chest'],['triceps','delts_f']],'mt-cross':[['chest'],['delts_f']],'pushup':[['chest'],['triceps','delts_f','abs']],'db-pullover':[['chest','lats'],['triceps']],
 'mt-pulldown':[['lats'],['biceps','midback']],'mt-row':[['midback','lats'],['biceps','delts_r']],'db-row':[['lats','midback'],['biceps','delts_r']],'mt-straight':[['lats'],['triceps']],'mt-facepull':[['delts_r','traps'],['midback']],
 'db-ohp':[['delts_f','delts_s'],['triceps','traps']],'db-lateral':[['delts_s'],['traps']],'db-front':[['delts_f'],[]],'db-rear':[['delts_r'],['midback','traps']],
 'db-curl':[['biceps'],['forearms']],'db-hammer':[['biceps','forearms'],[]],'mt-curl':[['biceps'],['forearms']],'db-conc':[['biceps'],[]],
 'mt-pushdown':[['triceps'],[]],'db-overhead':[['triceps'],[]],'db-kick':[['triceps'],[]],'pushup-close':[['triceps','chest'],['delts_f']],
 'db-goblet':[['quads','glutes'],['abs']],'db-lunge':[['quads','glutes'],['hams','adductors']],'db-bulg':[['quads','glutes'],['hams','adductors']],'db-step':[['quads','glutes'],['hams']],'mt-legext':[['quads'],[]],'mt-legcurl':[['hams'],[]],'db-rdl':[['hams','glutes'],['lowback']],'db-bridge':[['glutes'],['hams']],'db-calf':[['calves'],[]],
 'crunch':[['abs'],[]],'plank':[['abs'],['obliques','lowback']],'leg-raise':[['abs'],[]],'twist':[['obliques','abs'],[]],'mt-crunch':[['abs'],[]],'mountain':[['abs'],['delts_f','quads']]};
EX.forEach(e=>{if(!e.mu)e.mu=MU[e.id]||[[],[]];});
function syncCustom(){EX.length=BASE_N;Object.keys(EXM).forEach(k=>{if(k.startsWith('my-'))delete EXM[k];});(S.settings.custom||[]).forEach(c=>{const e=Object.assign({k:'i',type:'w',eq:['db'],p:'curl',cues:[],err:[],mus:'',en:c.he,mu:[[],[]]},c);EX.push(e);EXM[e.id]=e;});}
const CARDIO_MU={run:['quads','hams','calves','glutes'],tread:['quads','hams','calves','glutes'],spin:['quads','glutes','calves']};
function recovery(){const now=Date.now();const f={};const add=(m,v)=>f[m]=(f[m]||0)+v;
 for(const s of S.sessions){const h=(now-(s.end||s.start||0))/36e5;if(h<0||h>144)continue;const dec=Math.exp(-h/24);
  if(s.type==='cardio'){const ld=(+s.durMin||0)/20*dec;(CARDIO_MU[s.kind]||[]).forEach(m=>add(m,ld*(m==='quads'||m==='calves'?1:.6)));continue;}
  for(const it of s.items||[]){const e=EXM[it.ex];if(!e)continue;const n=(it.sets||[]).filter(x=>x.done).length;if(!n)continue;e.mu[0].forEach(m=>add(m,n*dec));e.mu[1].forEach(m=>add(m,n*.5*dec));}}
 const r={};Object.keys(MUS).forEach(m=>r[m]=Math.max(0,Math.min(100,Math.round(100-(f[m]||0)*15))));return r;}
const recCls=p=>p<50?'r':p<80?'a':'g';
const BM_SIL=(()=>{const C=(a,b,r1,r2)=>`<path class="bm-sil" d="${capsule(a,b,r1,r2)}"/>`;const side=m=>{const X=x=>m?120-x:x;return C([X(34),50],[X(27),100],7,5.5)+C([X(27),100],[X(22),140],5.5,4)+`<circle class="bm-sil" cx="${X(21)}" cy="146" r="4.5"/>`+C([X(49),124],[X(47),188],11,7)+C([X(47),188],[X(46),236],7,4.5)+`<ellipse class="bm-sil" cx="${X(46)}" cy="242" rx="6" ry="3.5"/>`;};
 return side(false)+side(true)+'<path class="bm-sil" d="M38 44 Q60 37 82 44 Q90 50 88 62 L84 122 Q60 132 36 122 L32 62 Q30 50 38 44 Z"/><rect class="bm-sil" x="54" y="32" width="12" height="10"/><ellipse class="bm-sil" cx="60" cy="22" rx="12" ry="14"/>';})();
const BM={front:[['delts_f delts_s','e',33,57,8,9,0,1],['chest','p','M60 50 Q47 47 40 57 Q41 73 59 72 Z',1],['biceps','e',29,82,5,12,12,1],['forearms','e',24,118,4.5,14,8,1],['abs','r',52,76,16,42,5,0],['obliques','e',45,100,5,14,0,1],['quads','e',49,160,9,26,4,1],['calves','e',46.5,212,5.5,17,0,1]],
 back:[['traps','p','M60 40 L75 50 L60 72 L45 50 Z',0],['delts_r delts_s','e',33,57,8,9,0,1],['triceps','e',29,83,5,12,12,1],['forearms','e',24,118,4.5,14,8,1],['lats','p','M45 62 Q38 86 49 112 L58 98 L57 66 Z',1],['midback','e',60,82,6.5,12,0,0],['lowback','r',52,104,16,18,5,0],['glutes','e',50,138,11,11,0,1],['hams','e',49,172,8.5,22,3,1],['calves','e',47,212,7,15,0,1]]};
/* ===================== ANATOMY (original SVG, left half mirrored) ===================== */
const ANAT_SIL='M100 60 L91 60 C90 70 88 76 80 80 C70 84 60 86 54 90 C42 96 37 108 37 122 C36 136 35 150 34 162 C33 176 31 188 30 198 C27 216 24 236 22 252 C21 260 20 266 21 272 C15 280 14 292 19 298 C24 302 30 296 31 288 C32 280 33 274 35 266 C38 252 42 232 45 214 C47 204 49 196 50 188 C52 172 54 158 56 146 C57 140 58 136 59 132 C61 150 63 168 64 184 C65 198 64 210 63 220 C62 232 60 244 59 256 C58 274 58 292 61 308 C63 320 65 330 66 338 C64 352 62 366 63 380 C64 392 66 402 67 410 C62 418 58 424 62 428 C70 431 80 431 86 428 C88 420 87 412 86 406 C87 392 88 376 87 362 C88 350 89 342 89 336 C92 316 95 296 96 280 C97 268 99 260 100 256 Z';
const ANAT_HEAD='M100 10 C87 10 81 21 81 34 C81 46 88 56 100 60 C112 56 119 46 119 34 C119 21 113 10 100 10 Z';
const ANAT={
 front:{decor:['M92 56 C93 65 96 73 99 80 L96 81 C93 74 90 66 89 59 Z','M66 140 C70 141 74 144 77 148 C73 149 69 147 65 145 Z','M65 150 C69 151 73 154 76 158 C72 159 68 157 64 155 Z','M68 254 C76 270 84 292 90 318 L88 320 C82 294 74 272 66 258 Z','M78 336 C84 336 88 342 88 348 C84 352 76 352 72 348 C72 342 74 337 78 336 Z','M76 352 C78 366 78 382 76 398 L73 398 C72 382 72 366 74 352 Z'],
  mus:[['traps','M90 62 C88 72 82 78 74 82 C82 82 90 80 96 78 Z'],['delts_s','M68 85 C56 86 44 94 40 108 C38 118 39 128 42 136 C46 128 50 118 54 108 C56 98 62 90 68 85 Z'],['delts_f','M70 86 C62 88 56 96 54 108 C54 116 56 122 58 126 C62 116 66 106 74 98 C74 94 73 90 70 86 Z'],
   ['chest','M98 86 C88 84 78 85 72 90 C70 96 70 102 72 106 C82 102 92 100 98 100 Z'],['chest','M98 102 C90 102 80 105 72 109 C66 116 64 126 68 134 C76 142 90 142 98 138 Z'],
   ['biceps','M54 128 C48 134 44 146 43 160 C43 172 46 182 50 188 C55 180 57 166 57 152 C57 142 56 134 54 128 Z'],['forearms','M44 192 C38 204 33 222 30 240 C29 250 29 258 31 264 C36 250 41 232 45 216 C47 206 47 198 44 192 Z'],['forearms','M48 196 C47 210 44 226 40 244 C38 254 36 260 35 266 C40 254 45 238 48 222 C50 210 50 202 48 196 Z'],
   ['abs','M88 146 C92 145 96 145 99 146 L99 162 L87 162 C86 156 86 150 88 146 Z'],['abs','M87 166 L99 166 L99 182 L86 182 C85 176 86 170 87 166 Z'],['abs','M86 186 L99 186 L99 202 L86 202 C85 196 85 190 86 186 Z'],['abs','M86 206 L99 206 L99 240 C94 238 90 230 88 222 C86 216 86 210 86 206 Z'],
   ['obliques','M84 146 C78 150 72 156 68 164 C66 180 66 196 68 210 C72 220 78 228 84 232 C83 214 83 196 84 180 C84 168 84 156 84 146 Z'],
   ['quads','M62 262 C58 280 58 300 61 316 C64 326 68 332 72 334 C70 318 70 300 72 282 C72 272 68 264 62 262 Z'],['quads','M74 260 C70 276 70 298 73 318 C76 326 80 330 84 330 C86 314 86 296 84 278 C82 268 78 262 74 260 Z'],['quads','M86 300 C88 312 88 322 86 332 C82 336 78 336 76 334 C80 330 83 322 84 312 C85 306 85 302 86 300 Z'],
   ['adductors','M88 254 C92 262 95 274 95 288 C94 296 91 302 87 306 C86 290 84 274 82 262 C84 258 86 256 88 254 Z'],
   ['calves','M68 352 C65 366 65 382 68 396 C71 394 72 380 72 366 C72 358 71 354 68 352 Z'],['calves','M84 356 C87 368 87 380 85 392 C82 386 80 372 80 360 Z']]},
 back:{decor:['M78 338 C84 338 88 342 88 346 C84 348 76 348 72 346 C72 342 74 339 78 338 Z','M78 390 C80 398 82 404 84 408 L80 408 C78 402 76 396 76 390 Z'],
  mus:[['lowback','M98 160 C92 168 90 184 90 200 C90 214 94 226 98 234 L100 236 L100 160 Z'],['midback','M84 100 C76 102 70 106 66 112 C68 120 74 126 82 128 C86 120 88 110 84 100 Z'],
   ['lats','M66 118 C62 134 62 152 64 168 C68 190 78 208 92 222 C96 214 96 200 94 186 C90 170 86 154 84 140 C80 132 74 124 66 118 Z'],
   ['traps','M100 60 C96 66 92 72 84 78 C76 82 70 86 66 90 C76 96 86 108 92 126 C95 136 98 146 100 152 Z'],
   ['delts_s','M68 85 C56 86 44 94 40 108 C38 118 39 128 42 136 C46 128 50 118 54 108 C56 98 62 90 68 85 Z'],['delts_r','M68 88 C58 90 50 98 46 110 C44 120 46 128 48 132 C54 122 60 112 68 104 C70 98 70 92 68 88 Z'],
   ['triceps','M44 128 C40 140 38 154 38 168 C40 176 42 182 44 186 C44 172 45 156 48 140 Z'],['triceps','M50 132 C46 144 44 158 44 170 C45 180 48 188 52 192 C56 182 58 168 58 154 C57 144 55 136 50 132 Z'],
   ['forearms','M42 194 C36 208 31 226 28 244 C27 254 28 262 30 266 C36 250 42 232 46 214 C48 206 47 198 42 194 Z'],['forearms','M48 198 C47 212 44 228 40 246 C38 254 37 260 36 266 C41 254 46 238 49 222 C50 212 50 204 48 198 Z'],
   ['glutes','M62 236 C58 244 58 252 60 258 C64 250 70 244 78 240 C72 236 66 234 62 236 Z'],['glutes','M98 238 C88 234 76 236 68 244 C62 254 62 268 66 280 C74 290 88 292 98 288 Z'],
   ['hams','M64 290 C60 306 60 322 64 336 C68 340 72 340 76 336 C76 322 76 306 74 292 Z'],['hams','M78 292 C80 308 82 322 82 334 C86 336 90 334 92 330 C94 316 94 302 92 290 C88 292 82 292 78 292 Z'],
   ['calves','M66 348 C62 360 62 374 66 386 C70 388 74 384 76 378 C76 366 74 354 70 346 Z'],['calves','M78 346 C76 360 76 374 80 388 C84 390 88 384 88 376 C89 364 86 352 80 346 Z']]}};
const MUSX={chest:'Pectoralis major',delts_f:'Anterior deltoid',delts_s:'Lateral deltoid',delts_r:'Posterior deltoid',biceps:'Biceps brachii',triceps:'Triceps brachii',forearms:'Forearm flexors & extensors',abs:'Rectus abdominis',obliques:'External obliques',traps:'Trapezius',lats:'Latissimus dorsi',midback:'Rhomboids & teres',lowback:'Erector spinae',glutes:'Gluteus maximus & medius',quads:'Quadriceps',hams:'Hamstrings',calves:'Gastrocnemius & soleus',adductors:'Adductors'};
const MIR=' transform="translate(200 0) scale(-1 1)"';
// opts: {vb, interactive, sel:Set}
function bodySVG(side,colorOf,small,opts){opts=opts||{};const vb=opts.vb||(typeof small==='string'?small:'10 4 180 432');const A=ANAT[side];const sel=opts.sel||new Set();
 const half=t=>`<path d="${ANAT_SIL}" class="an-body"${t}/>`;
 let h=`<path d="${ANAT_HEAD}" class="an-body"/>${half('')}${half(MIR)}`;
 A.decor.forEach(d=>{h+=`<path d="${d}" class="an-dec"/><path d="${d}" class="an-dec"${MIR}/>`;});
 A.mus.forEach(([id,d])=>{const c=colorOf(id);const on=sel.has(id);const ia=opts.interactive?` data-act="mm" data-m="${id}"`:'';
  [ '',MIR ].forEach(t=>{h+=`<path d="${d}" class="an-m${c?' an-on':''}${on?' an-sel':''}"${c?` style="fill:${c}"`:''}${ia}${t}/><path d="${d}" class="an-fib"${t}/>`;if(c)h+=`<path d="${d}" class="an-sheen"${t}/>`;});});
 h+=side==='front'?'<path d="M100 86 V140 M100 146 V240" class="an-line"/>':'<path d="M100 62 V236" class="an-line"/>';
 return `<svg viewBox="${vb}" ${small?'aria-hidden="true"':`role="img" aria-label="${side==='front'?'מבט קדמי':'מבט אחורי'}"`}>${h}</svg>`;}
function bodyMap(colorOf){return `<div class="bmap"><figure>${bodySVG('front',colorOf)}<figcaption>מקדימה</figcaption></figure><figure>${bodySVG('back',colorOf)}<figcaption>מאחור</figcaption></figure></div>`;}
/* ---- training load per muscle, from saved sets only ---- */
const MM_T={last:[4,2],active:[4,2],7:[10,5],30:[36,16]};
const MM_GROUPS=[['chest','חזה',['chest'],'f'],['back','גב',['lats','midback','traps','lowback'],'b'],['shoulders','כתפיים',['delts_f','delts_s','delts_r'],'f'],['biceps','יד קדמית',['biceps','forearms'],'f'],['triceps','יד אחורית',['triceps'],'b'],['core','בטן',['abs','obliques'],'f'],['legs','רגליים',['quads','hams','glutes','calves','adductors'],'f']];
function muscleLoad(period){let sess=[];const act=S.active&&doneSets(S.active)?S.active:null;
 if(period==='active')sess=act?[act]:[];
 else if(period==='last'){if(act)sess=[act];else{const l=sorted().find(x=>x.type==='strength'&&doneSets(x));if(l)sess=[l];}}
 else{const since=Date.now()-(+period)*864e5;sess=S.sessions.filter(x=>x.type==='strength'&&(x.start||0)>=since);if(act)sess=sess.concat([act]);}
 const M={};
 sess.forEach(x=>(x.items||[]).forEach(it=>{const e=EXM[it.ex];if(!e)return;const d=(it.sets||[]).filter(z=>z.done);if(!d.length)return;
  const vol=d.reduce((a,z)=>a+(+z.w||0)*(+z.r||0),0),reps=d.reduce((a,z)=>a+(+z.r||0),0),when=x.end||x.start||Date.now();
  const add=(m,role)=>{const o=M[m]=M[m]||{pri:0,sec:0,vol:0,reps:0,last:0,ex:{}};o[role]+=d.length;o.vol+=role==='pri'?vol:vol/2;o.reps+=reps;o.last=Math.max(o.last,when);
   const xe=o.ex[it.ex]=o.ex[it.ex]||{sets:0,vol:0,role,last:0};xe.sets+=d.length;xe.vol+=vol;xe.last=Math.max(xe.last,when);if(role==='pri')xe.role='pri';};
  e.mu[0].forEach(m=>add(m,'pri'));e.mu[1].forEach(m=>add(m,'sec'));}));
 return{M,sess};}
const effSets=o=>o?o.pri+o.sec*0.5:0;
function mmLevel(o,period){const e=effSets(o);if(!e)return 0;const t=MM_T[period]||MM_T.last;return e>=t[0]?3:e>=t[1]?2:1;}
const LV_FILL=['','url(#lvL)','url(#lvM)','url(#lvH)'],LV_HE=['לא אומן','עומס נמוך','עומס בינוני','עומס גבוה'],LV_CLS=['n','l','m','h'];
const loadColor=(L,period)=>m=>LV_FILL[mmLevel(L.M[m],period)]||null;
function muscleMapCard(){const st=UI.mm=UI.mm||{period:'last',sel:null};const P=st.period;const L=muscleLoad(P);
 const selIds=!st.sel?[]:st.sel.startsWith('g:')?(MM_GROUPS.find(g=>g[0]===st.sel.slice(2))||[,,[]])[2]:[st.sel];const sel=new Set(selIds);
 const per=[['last','אימון אחרון'],['7','7 ימים'],['30','30 ימים']];
 const tr=Object.keys(MUS).filter(m=>L.M[m]).sort((a,b)=>effSets(L.M[b])-effSets(L.M[a]));
 // info panel
 let info='';
 if(!selIds.length)info=`<p class="muted small" style="margin:0">הקש על שריר במפה או על קבוצה למטה כדי לראות תרגילים, סטים, נפח ותאריך אחרון.</p>`;
 else{const agg={pri:0,sec:0,vol:0,reps:0,last:0,ex:{}};selIds.forEach(m=>{const o=L.M[m];if(!o)return;agg.pri+=o.pri;agg.sec+=o.sec;agg.vol+=o.vol;agg.reps+=o.reps;agg.last=Math.max(agg.last,o.last);Object.entries(o.ex).forEach(([k,v])=>{const z=agg.ex[k]=agg.ex[k]||{sets:0,vol:0,role:v.role,last:0};z.sets=Math.max(z.sets,v.sets);z.vol=Math.max(z.vol,v.vol);z.last=Math.max(z.last,v.last);if(v.role==='pri')z.role='pri';});});
  {const xs=Object.values(agg.ex);agg.pri=xs.filter(v=>v.role==='pri').reduce((q,v)=>q+v.sets,0);agg.sec=xs.filter(v=>v.role!=='pri').reduce((q,v)=>q+v.sets,0);agg.vol=xs.reduce((q,v)=>q+(v.role==='pri'?v.vol:v.vol/2),0);}
  const isG=st.sel.startsWith('g:');const g=isG&&MM_GROUPS.find(x=>x[0]===st.sel.slice(2));const lv=isG?Math.max(0,...selIds.map(m=>mmLevel(L.M[m],P))):mmLevel(L.M[selIds[0]],P);
  const name=isG?g[1]:MUS[selIds[0]];const en=isG?selIds.map(m=>MUSX[m]).join(' · '):MUSX[selIds[0]];
  info=`<div class="row between" style="align-items:flex-start"><div><h3 style="font-size:1.2rem">${esc(name)}</h3><div class="small muted" dir="ltr" style="text-align:right">${esc(en)}</div></div><span class="lv lv-${LV_CLS[lv]}">${LV_HE[lv]}</span></div>`;
  if(!agg.pri&&!agg.sec)info+=`<p class="muted" style="margin:0">לא נרשמו סטים לשריר הזה ${P==='last'?'באימון האחרון':`ב-${P} הימים האחרונים`}.</p>`;
  else{const ex=Object.entries(agg.ex).sort((a,b)=>b[1].sets-a[1].sets);
   info+=`<div class="mmstats"><div><b class="num">${agg.pri}</b><span>סטים ראשיים</span></div><div><b class="num">${agg.sec}</b><span>סטים משניים</span></div><div><b class="num">${Math.round(agg.vol).toLocaleString('he-IL')}</b><span>נפח (ק״ג)</span></div><div><b class="num">${heDate(dstr(new Date(agg.last)),{day:'numeric',month:'numeric'})}</b><span>אימון אחרון</span></div></div>
   <table class="t">${ex.map(([k,v])=>`<tr><th>${esc(EXM[k]?EXM[k].he:k)}</th><td><span class="mrole ${v.role}">${v.role==='pri'?'ראשי':'משני'}</span></td><td class="num">${v.sets} סטים</td><td class="num">${Math.round(v.vol).toLocaleString('he-IL')} ק״ג</td></tr>`).join('')}</table>`;}}
 // summary
 let sum='';
 if(!L.sess.length)sum=`<p class="muted small" style="margin:0">${P==='last'?'עוד אין אימון כוח שמור. אחרי שתסמן סטים באימון, המפה תתעדכן כאן.':'לא נשמרו אימוני כוח בתקופה הזו.'}</p>`;
 else if(P==='last'){const x=L.sess[0];const live=x===S.active;sum=`<div class="mmsum"><span>${live?'אימון פעיל עכשיו':esc((x.areas||[]).map(a=>AREA_HE[a]).join(', ')||'אימון כוח')}</span><span>${heDate(x.date,{day:'numeric',month:'long'})} · ${new Date(x.start).toTimeString().slice(0,5)}</span><span>${Math.max(1,Math.round(((x.end||Date.now())-x.start)/60000))} דקות · ${doneSets(x)} סטים · ${Math.round(volOf(x)).toLocaleString('he-IL')} ק״ג</span></div>`;}
 else{const sets=L.sess.reduce((a,x)=>a+doneSets(x),0),vol=L.sess.reduce((a,x)=>a+volOf(x),0);sum=`<div class="mmsum"><span>${L.sess.length} אימוני כוח ב-${P} ימים</span><span>${sets} סטים · ${Math.round(vol).toLocaleString('he-IL')} ק״ג נפח</span></div>`;}
 const t=MM_T[P];
 return `<section class="card mmcard" id="mmcard"><div><h2 style="font-size:1.5rem">מפת שרירים</h2><div class="small muted">אזורי עבודה לפי הסטים ששמרת בפועל</div></div>
 <div class="seg" role="tablist">${per.map(([k,v])=>`<button data-act="mmper" data-v="${k}" aria-pressed="${P===k}">${v}</button>`).join('')}</div>
 <div class="mmfigs"><figure>${bodySVG('front',loadColor(L,P),false,{interactive:true,sel})}<figcaption>מקדימה</figcaption></figure><figure>${bodySVG('back',loadColor(L,P),false,{interactive:true,sel})}<figcaption>מאחור</figcaption></figure></div>
 <div class="mmgroups">${MM_GROUPS.map(([k,v,mus,side])=>{const lv=Math.max(0,...mus.map(m=>mmLevel(L.M[m],P)));return `<button class="mmg lvb-${LV_CLS[lv]}" data-act="mmgrp" data-v="${k}" aria-pressed="${st.sel==='g:'+k}"><span class="mmi">${miniBody(mus,side==='b'?'b':'f',L,P)}</span><span>${v}</span></button>`;}).join('')}</div>
 <div class="mminfo" aria-live="polite">${info}</div>
 <div class="mmlegend"><span><i class="lv-h"></i>גבוה (${t[0]}+ סטים)</span><span><i class="lv-m"></i>בינוני (${t[1]}–${t[0]-0.5})</span><span><i class="lv-l"></i>נמוך</span><span><i class="lv-n"></i>לא אומן</span></div>
 <div class="label">${P==='last'?'סיכום אימון אחרון':'סיכום תקופה'}</div>${sum}
 <div class="label">קבוצות שרירים</div><div class="mmlist">${Object.keys(MUS).map(m=>{const o=L.M[m];const lv=mmLevel(o,P);return `<button class="mmrow" data-act="mm" data-m="${m}" aria-pressed="${st.sel===m}"><i class="ck lv-${LV_CLS[lv]}">${lv?'✓':''}</i><span>${MUS[m]}</span><span class="num muted small">${o?`${o.pri}${o.sec?` + ${o.sec} משני`:''} סטים`:''}</span></button>`;}).join('')}</div>
 <p class="small muted" style="margin:0">סט ראשי נספר כ-1 וסט משני כ-0.5. נפח לשריר משני מחושב בחצי. מבוסס רק על סטים מסומנים ✓, כולל האימון הפעיל.</p></section>`;}
function renderMM(){const el=$('#mmcard');if(!el)return;el.outerHTML=muscleMapCard();}
const targetColor=(pri,sec)=>m=>pri.includes(m)?'url(#lvH)':sec.includes(m)?'url(#lvM)':null;
const recColor=rec=>m=>{const p=rec[m];return p>=95?null:p<50?'url(#lvH)':p<80?'url(#lvM)':'url(#bmOk)';};
function draftMuscles(items){const p=new Set(),q=new Set();items.forEach(id=>{const e=EXM[id];if(!e)return;e.mu[0].forEach(m=>p.add(m));e.mu[1].forEach(m=>q.add(m));});return[[...p],[...q].filter(m=>!p.has(m))];}
const CARDIO={
 run:{he:'ריצה בחוץ',p:'run',plans:[
  {id:'z2',he:'ריצה קלה, אזור 2',d:'30–45 דק׳ בדופק עד 70% מהמקסימום. צריך להיות אפשר לדבר במשפטים מלאים.',dur:40},
  {id:'tempo',he:'טמפו',d:'10 דק׳ חימום, 20 דק׳ בקצב קשה-בנוח (אזור 3–4), 10 דק׳ שחרור.',dur:40},
  {id:'int',he:'אינטרוולים',d:'10 דק׳ חימום, 6×400 מ׳ מהיר עם 90 שנ׳ הליכה, 10 דק׳ שחרור.',dur:35},
  {id:'long',he:'ריצה ארוכה',d:'60–90 דק׳ בקצב שיחה. מגדילים עד 10% בשבוע.',dur:70}]},
 tread:{he:'הליכון',p:'tread',plans:[
  {id:'incline',he:'הליכה בשיפוע',d:'30 דק׳ בשיפוע 10–12% ומהירות 5–5.5 קמ״ש, בלי להחזיק במעקות.',dur:30},
  {id:'int',he:'אינטרוולים',d:'5 דק׳ חימום, 8×(דקה מהיר / דקה הליכה), 5 דק׳ שחרור.',dur:26},
  {id:'z2',he:'ריצה קלה',d:'30–40 דק׳ באזור 2, שיפוע 1% כדי לדמות ריצה בחוץ.',dur:35}]},
 spin:{he:'ספינינג',p:'cycle',plans:[
  {id:'hiit',he:'אינטרוולים',d:'5 דק׳ חימום, 8×(40 שנ׳ חזק בהתנגדות גבוהה / 80 שנ׳ קל), 5 דק׳ שחרור.',dur:26},
  {id:'z2',he:'רכיבת סיבולת',d:'40–50 דק׳ באזור 2, סל״ד 85–95.',dur:45},
  {id:'climb',he:'טיפוסים',d:'5×(4 דק׳ התנגדות גבוהה בסל״ד 60–70 / 2 דק׳ קל), חימום ושחרור 5 דק׳.',dur:40}]}
};
const DAYS=['א׳','ב׳','ג׳','ד׳','ה׳','ו׳','ש׳'];
const DEF_PLAN=[
 {l:'חזה, כתפיים, יד אחורית',areas:['chest','shoulders','triceps']},
 {l:'ריצה קלה',cardio:'run'},
 {l:'גב, יד קדמית, בטן',areas:['back','biceps','core']},
 {l:'ספינינג',cardio:'spin'},
 {l:'רגליים ובטן',areas:['legs','core']},
 {l:'ריצה ארוכה',cardio:'run'},
 {l:'מנוחה'}];
const DEF={maxHr:180,dbInc:2,mtInc:5,goal:'hyper',dur:45,sound:true,videos:{},plan:DEF_PLAN};

/* ===================== FIGURE ENGINE ===================== */
const R=Math.PI/180;
const P=(o,a,l)=>[o[0]+l*Math.cos(a*R),o[1]+l*Math.sin(a*R)];
const L={t:50,ua:28,fa:26,th:38,sh:36,ft:11};
const m=(...o)=>Object.assign({},...o);
const ST={hip:[120,96],torso:-90,a1:92,f1:92,a2:88,f2:88,t1:91,s1:90,t2:89,s2:90};
const FR={front:true,hip:[120,96],torso:-90,t1:96,s1:92,t2:84,s2:88,ft1:180,ft2:0};
const SIT={hip:[105,134],torso:-90,t1:0,s1:90,t2:-4,s2:88};
const LIE={hip:[140,124],torso:180,t1:16,s1:92,t2:22,s2:88};
const INC={hip:[140,128],torso:-148,t1:10,s1:92,t2:14,s2:88};
const BENT={hip:[108,100],torso:-20,t1:82,s1:94,t2:84,s2:92};
const RUNA={hip:[118,98],torso:-80,t1:55,s1:100,t2:125,s2:165,a1:115,f1:55,a2:60,f2:-30};
const RUNB={hip:[118,98],torso:-80,t1:125,s1:165,t2:55,s2:100,a1:60,f1:-30,a2:115,f2:55};
const FLOOR='<line x1="10" y1="171" x2="230" y2="171" class="pf"/>';
const bench=(x1,x2,y)=>`<rect class="pr" x="${x1}" y="${y}" width="${x2-x1}" height="6" rx="2"/><line class="prs" x1="${x1+10}" y1="${y+6}" x2="${x1+10}" y2="170"/><line class="prs" x1="${x2-10}" y1="${y+6}" x2="${x2-10}" y2="170"/>`;
const tower=(x,anc)=>`<line class="prs" x1="${x}" y1="8" x2="${x}" y2="170"/><line class="prs" x1="${x-14}" y1="170" x2="${x+14}" y2="170"/>`+(anc[1]<40?`<line class="prs" x1="${x}" y1="8" x2="${anc[0]}" y2="8"/>`:'');
const seatBack=(x)=>`<rect class="pr" x="${x-30}" y="137" width="55" height="6" rx="2"/><line class="prs" x1="${x-2}" y1="143" x2="${x-2}" y2="170"/><line class="prs" x1="${x-11}" y1="137" x2="${x-11}" y2="74"/>`;
const PATS={
 press:{props:FLOOR+bench(55,160,128),hold:'db2',A:m(LIE,{a1:62,f1:-92,a2:58,f2:-88}),B:m(LIE,{a1:-86,f1:-88,a2:-84,f2:-86})},
 incline:{props:FLOOR+'<line class="prs" x1="146" y1="138" x2="82" y2="98" style="stroke-width:7"/><rect class="pr" x="120" y="134" width="50" height="6" rx="2"/><line class="prs" x1="140" y1="140" x2="140" y2="170"/>',hold:'db2',A:m(INC,{a1:75,f1:-110,a2:70,f2:-105}),B:m(INC,{a1:-112,f1:-112,a2:-108,f2:-108})},
 fly:{props:FLOOR+'<rect class="pr" x="104" y="20" width="32" height="112" rx="5" opacity=".7"/>',hold:'db2',A:m(FR,{a1:135,f1:20,a2:45,f2:160}),B:m(FR,{a1:180,f1:185,a2:0,f2:-5})},
 pullover:{props:FLOOR+bench(55,160,128),hold:'dbc',A:m(LIE,{a1:-88,f1:-92,a2:-86,f2:-90}),B:m(LIE,{a1:-178,f1:-176,a2:-176,f2:-174})},
 mpress:{props:FLOOR+seatBack(95),hold:'handle',A:m(SIT,{hip:[95,134],torso:-92,a1:140,f1:-10,a2:136,f2:-12}),B:m(SIT,{hip:[95,134],torso:-92,a1:-2,f1:0,a2:2,f2:0})},
 cross:{props:FLOOR+tower(20,[20,14])+tower(220,[220,14]),anc:[[28,16],[212,16]],hold:'cable2',A:m(FR,{a1:-150,f1:-160,a2:-30,f2:-20}),B:m(FR,{a1:110,f1:40,a2:70,f2:140})},
 pushup:{props:FLOOR,hold:'none',A:{hip:[120,136],torso:-24,a1:90,f1:90,a2:92,f2:92,t1:156,s1:156,t2:158,s2:158,ft1:60,ft2:60},B:{hip:[115,141],torso:-6,a1:138,f1:30,a2:136,f2:32,t1:158,s1:160,t2:160,s2:160,ft1:60,ft2:60}},
 plank:{props:FLOOR,hold:'none',A:{hip:[115,148],torso:-9,a1:92,f1:0,a2:90,f2:2,t1:164,s1:165,t2:165,s2:166,ft1:70,ft2:70},B:{hip:[115,145],torso:-12,a1:94,f1:0,a2:92,f2:2,t1:162,s1:164,t2:163,s2:165,ft1:70,ft2:70},per:4},
 mountain:{props:FLOOR,hold:'none',A:{hip:[120,136],torso:-24,a1:90,f1:90,a2:92,f2:92,t1:30,s1:150,t2:158,s2:158,ft1:60,ft2:60},B:{hip:[120,136],torso:-24,a1:90,f1:90,a2:92,f2:92,t1:158,s1:158,t2:30,s2:150,ft1:60,ft2:60},per:0.9},
 pulldown:{props:FLOOR+seatBack(105)+tower(150,[128,10]),anc:[[128,12]],hold:'cable',A:m(SIT,{a1:-76,f1:-80,a2:-80,f2:-84}),B:m(SIT,{a1:100,f1:-70,a2:104,f2:-66})},
 crow:{props:FLOOR+'<rect class="pr" x="45" y="155" width="60" height="6" rx="2"/><line class="prs" x1="160" y1="132" x2="162" y2="168"/>'+tower(214,[205,140]),anc:[[205,140]],hold:'cable',A:{hip:[80,150],torso:-72,a1:0,f1:-2,a2:2,f2:0,t1:-6,s1:8,t2:-8,s2:10},B:{hip:[80,150],torso:-95,a1:150,f1:-5,a2:146,f2:-3,t1:-6,s1:8,t2:-8,s2:10}},
 dbrow:{props:FLOOR+bench(50,165,146),hold:'db1',A:{hip:[90,104],torso:-15,a1:90,f1:90,a2:88,f2:92,t1:80,s1:180,t2:100,s2:86},B:{hip:[90,104],torso:-15,a1:202,f1:82,a2:88,f2:92,t1:80,s1:180,t2:100,s2:86}},
 straight:{props:FLOOR+tower(196,[176,10]),anc:[[176,12]],hold:'cable',A:m(ST,{torso:-80,a1:-45,f1:-45,a2:-48,f2:-48}),B:m(ST,{torso:-80,a1:75,f1:75,a2:78,f2:78})},
 facepull:{props:FLOOR+tower(206,[190,52]),anc:[[194,52]],hold:'cable',A:m(ST,{a1:-8,f1:-6,a2:-6,f2:-4}),B:m(ST,{a1:-170,f1:-20,a2:-168,f2:-24})},
 pushdown:{props:FLOOR+tower(176,[152,10]),anc:[[152,12]],hold:'cable',A:m(ST,{torso:-86,a1:98,f1:-40,a2:96,f2:-38}),B:m(ST,{torso:-86,a1:94,f1:88,a2:92,f2:86})},
 ccurl:{props:FLOOR+tower(186,[172,162]),anc:[[172,162]],hold:'cable',A:m(ST,{a1:92,f1:92,a2:90,f2:90}),B:m(ST,{a1:96,f1:-62,a2:94,f2:-58})},
 ohp:{props:FLOOR+seatBack(105),hold:'db2',A:m(SIT,{a1:75,f1:-95,a2:80,f2:-92}),B:m(SIT,{a1:-84,f1:-86,a2:-88,f2:-90})},
 lateral:{props:FLOOR,hold:'db2',A:m(FR,{a1:98,f1:96,a2:82,f2:84}),B:m(FR,{a1:178,f1:176,a2:2,f2:4})},
 front:{props:FLOOR,hold:'db2',A:m(ST,{a1:88,f1:85,a2:90,f2:88}),B:m(ST,{a1:-5,f1:-8,a2:-2,f2:-5})},
 rear:{props:FLOOR,hold:'db2',A:m(BENT,{a1:90,f1:90,a2:88,f2:88}),B:m(BENT,{a1:200,f1:195,a2:196,f2:192})},
 curl:{props:FLOOR,hold:'db2',A:m(ST),B:m(ST,{a1:96,f1:-62,a2:94,f2:-58})},
 overhead:{props:FLOOR,hold:'dbc',A:m(ST,{a1:-100,f1:110,a2:-98,f2:112}),B:m(ST,{a1:-100,f1:262,a2:-98,f2:264})},
 kickback:{props:FLOOR,hold:'db1',A:{hip:[100,100],torso:-20,a1:165,f1:95,a2:95,f2:60,t1:80,s1:96,t2:100,s2:88},B:{hip:[100,100],torso:-20,a1:165,f1:172,a2:95,f2:60,t1:80,s1:96,t2:100,s2:88}},
 squat:{props:FLOOR,hold:'dbc',A:{hip:[120,96],torso:-88,a1:70,f1:-115,a2:74,f2:-112,t1:90,s1:90,t2:88,s2:92},B:{hip:[100,135],torso:-68,a1:70,f1:-110,a2:74,f2:-108,t1:15,s1:123,t2:18,s2:120}},
 lunge:{props:FLOOR,hold:'db2',A:{hip:[120,98],torso:-90,a1:90,f1:90,a2:92,f2:92,t1:75,s1:105,t2:110,s2:120,ft1:0,ft2:20},B:{hip:[120,130],torso:-90,a1:90,f1:90,a2:92,f2:92,t1:10,s1:95,t2:110,s2:175,ft1:0,ft2:10}},
 bulgarian:{props:FLOOR+bench(35,95,136),hold:'db2',A:{hip:[128,100],torso:-90,a1:90,f1:90,a2:92,f2:92,t1:80,s1:98,t2:135,s2:172,ft1:0,ft2:200},B:{hip:[128,128],torso:-86,a1:90,f1:90,a2:92,f2:92,t1:12,s1:96,t2:125,s2:205,ft1:0,ft2:220}},
 stepup:{props:FLOOR+'<rect class="pr" x="132" y="140" width="66" height="31" rx="3"/>',hold:'db2',A:{hip:[115,96],torso:-88,a1:90,f1:90,a2:92,f2:92,t1:15,s1:100,t2:92,s2:92},B:{hip:[150,66],torso:-90,a1:90,f1:90,a2:92,f2:92,t1:90,s1:90,t2:100,s2:120}},
 rdl:{props:FLOOR,hold:'db2',A:m(ST,{hip:[112,96]}),B:{hip:[108,100],torso:-18,a1:90,f1:90,a2:92,f2:92,t1:82,s1:94,t2:84,s2:92}},
 legext:{props:FLOOR+'<rect class="pr" x="66" y="128" width="78" height="6" rx="2"/><line class="prs" x1="105" y1="134" x2="105" y2="170"/><line class="prs" x1="90" y1="130" x2="79" y2="72"/>',hold:'none',A:{hip:[100,124],torso:-100,a1:95,f1:40,a2:92,f2:44,t1:0,s1:90,t2:-3,s2:88},B:{hip:[100,124],torso:-100,a1:95,f1:40,a2:92,f2:44,t1:0,s1:6,t2:-3,s2:4}},
 legcurl:{props:FLOOR+bench(45,185,127),hold:'none',A:{hip:[110,122],torso:0,a1:95,f1:0,a2:92,f2:2,t1:180,s1:180,t2:178,s2:178,ft1:90,ft2:90},B:{hip:[110,122],torso:0,a1:95,f1:0,a2:92,f2:2,t1:180,s1:275,t2:178,s2:280,ft1:0,ft2:0}},
 calf:{props:FLOOR,hold:'db2',A:m(ST,{ft1:0,ft2:0}),B:m(ST,{hip:[120,88],ft1:35,ft2:35})},
 bridge:{props:FLOOR,hold:'dbhip',A:{hip:[112,164],torso:182,a1:-2,f1:0,a2:0,f2:2,t1:-40,s1:75,t2:-38,s2:77},B:{hip:[112,136],torso:152,a1:10,f1:5,a2:12,f2:7,t1:-8,s1:92,t2:-6,s2:94}},
 crunch:{props:FLOOR,hold:'none',A:{hip:[120,162],torso:180,a1:10,f1:0,a2:8,f2:2,t1:-45,s1:65,t2:-42,s2:68},B:{hip:[120,162],torso:210,a1:-5,f1:-10,a2:-7,f2:-12,t1:-45,s1:65,t2:-42,s2:68}},
 legraise:{props:FLOOR,hold:'none',A:{hip:[130,162],torso:180,a1:5,f1:0,a2:3,f2:2,t1:-2,s1:0,t2:-4,s2:-2},B:{hip:[130,162],torso:180,a1:5,f1:0,a2:3,f2:2,t1:-85,s1:-88,t2:-87,s2:-90}},
 twist:{props:FLOOR,hold:'dbc',A:{hip:[120,160],torso:-125,a1:30,f1:-10,a2:34,f2:-6,t1:-40,s1:20,t2:-36,s2:24},B:{hip:[120,160],torso:-118,a1:80,f1:40,a2:84,f2:44,t1:-40,s1:20,t2:-36,s2:24}},
 ccrunch:{props:FLOOR+tower(176,[150,8]),anc:[[150,10]],hold:'cable',A:{hip:[110,132],torso:-80,a1:70,f1:-100,a2:68,f2:-102,t1:90,s1:180,t2:88,s2:182},B:{hip:[110,132],torso:-20,a1:130,f1:-40,a2:128,f2:-42,t1:90,s1:180,t2:88,s2:182}},
 cycle:{props:'<line x1="70" y1="171" x2="200" y2="171" class="pf"/><rect class="pr" x="86" y="96" width="28" height="5" rx="2"/><line class="prs" x1="100" y1="100" x2="116" y2="140"/><circle cx="118" cy="140" r="16" class="prs" style="stroke-width:3"/><circle cx="168" cy="140" r="20" class="pr"/><line class="prs" x1="118" y1="140" x2="168" y2="140"/><line class="prs" x1="150" y1="140" x2="163" y2="86"/><line class="prs" x1="158" y1="86" x2="178" y2="90"/><line class="prs" x1="96" y1="170" x2="190" y2="170"/>',hold:'none',ik:true,A:{hip:[100,92],torso:-40,a1:40,f1:50,a2:42,f2:52},per:1.2},
 tread:{props:'<rect class="pr" x="34" y="168" width="160" height="7" rx="3"/><line class="prs" x1="192" y1="170" x2="206" y2="80"/><line class="prs" x1="206" y1="80" x2="178" y2="92"/><line class="gr" x1="40" y1="166" x2="188" y2="166"/>',hold:'none',A:m(RUNA,{hip:[118,96]}),B:m(RUNB,{hip:[118,96]}),per:0.8,belt:true},
 run:{props:'<line class="gr" x1="10" y1="171" x2="230" y2="171"/>',hold:'none',A:RUNA,B:RUNB,per:0.75,belt:true}
};
Object.assign(PATS,{
 bentrow:{props:FLOOR,hold:'db2',A:m(BENT,{a1:90,f1:90,a2:88,f2:88}),B:m(BENT,{a1:200,f1:82,a2:204,f2:84})},
 csrow:{props:FLOOR+'<line class="prs" x1="98" y1="113" x2="166" y2="89" style="stroke-width:7"/><line class="prs" x1="124" y1="108" x2="124" y2="170"/>',hold:'db2',A:m(BENT,{a1:90,f1:90,a2:88,f2:88}),B:m(BENT,{a1:200,f1:82,a2:204,f2:84})},
 superman:{props:FLOOR,hold:'none',A:{hip:[118,163],torso:0,a1:2,f1:0,a2:0,f2:2,t1:180,s1:180,t2:182,s2:182,ft1:90,ft2:90},B:{hip:[118,162],torso:-12,a1:-14,f1:-16,a2:-12,f2:-14,t1:170,s1:172,t2:172,s2:174,ft1:80,ft2:80}},
 shrug:{props:FLOOR,hold:'db2',A:m(ST,{sh:0}),B:m(ST,{sh:7})},
 upright:{props:FLOOR,hold:'db2',A:m(FR,{a1:98,f1:96,a2:82,f2:84}),B:m(FR,{a1:-160,f1:40,a2:-20,f2:140})},
 skull:{props:FLOOR+bench(55,160,128),hold:'db2',A:m(LIE,{a1:-82,f1:-84,a2:-80,f2:-82}),B:m(LIE,{a1:-82,f1:-172,a2:-80,f2:-170})},
 dip:{props:FLOOR+bench(30,108,120),hold:'none',A:{hip:[100,116],torso:-90,a1:90,f1:90,a2:92,f2:88,t1:25,s1:70,t2:28,s2:72},B:{hip:[98,142],torso:-90,a1:146,f1:28,a2:144,f2:30,t1:0,s1:50,t2:3,s2:52}},
 wallsit:{props:'<line class="prs" x1="83" y1="10" x2="83" y2="170"/>'+FLOOR,hold:'none',A:{hip:[96,134],torso:-90,a1:90,f1:0,a2:92,f2:2,t1:0,s1:90,t2:-3,s2:88},B:{hip:[96,133],torso:-90,a1:90,f1:2,a2:92,f2:4,t1:0,s1:90,t2:-3,s2:88},per:4},
 calfseat:{props:FLOOR+seatBack(105),hold:'dbknee',A:m(SIT,{a1:70,f1:40,a2:72,f2:42,ft1:0,ft2:0}),B:m(SIT,{t1:-7,s1:90,t2:-10,s2:88,a1:66,f1:36,a2:68,f2:38,ft1:38,ft2:38})},
 kickglute:{props:FLOOR+tower(206,[190,160]),anc:[[190,160]],hold:'cablefoot',A:m(ST,{torso:-78,a1:60,f1:20,a2:62,f2:22,t1:96,s1:96}),B:m(ST,{torso:-72,a1:60,f1:20,a2:62,f2:22,t1:150,s1:155})},
 deadbug:{props:FLOOR,hold:'none',A:{hip:[132,162],torso:180,a1:-90,f1:-90,a2:-92,f2:-92,t1:-90,s1:0,t2:-88,s2:2},B:{hip:[132,162],torso:180,a1:-170,f1:-174,a2:-92,f2:-92,t1:-90,s1:0,t2:-8,s2:-4}},
 bicycle:{props:FLOOR,hold:'none',A:{hip:[125,162],torso:205,a1:-30,f1:-60,a2:-40,f2:-70,t1:-60,s1:12,t2:-12,s2:-8},B:{hip:[125,162],torso:205,a1:-40,f1:-70,a2:-30,f2:-60,t1:-12,s1:-8,t2:-60,s2:12},per:1.4},
 woodchop:{props:FLOOR+tower(22,[30,14]),anc:[[30,16]],hold:'cable',A:m(FR,{a1:-150,f1:-150,a2:-140,f2:-150}),B:m(FR,{a1:62,f1:58,a2:72,f2:62})},
 hollow:{props:FLOOR,hold:'none',A:{hip:[125,160],torso:194,a1:192,f1:190,a2:194,f2:192,t1:-14,s1:-12,t2:-12,s2:-10},B:{hip:[125,160],torso:196,a1:194,f1:192,a2:196,f2:194,t1:-16,s1:-14,t2:-14,s2:-12},per:3},
 revcrunch:{props:FLOOR,hold:'none',A:{hip:[128,162],torso:180,a1:4,f1:0,a2:2,f2:2,t1:-60,s1:30,t2:-58,s2:32},B:{hip:[124,158],torso:176,a1:4,f1:0,a2:2,f2:2,t1:-115,s1:-30,t2:-112,s2:-28}}
});
function ik(h,t,fwd){const dx=t[0]-h[0],dy=t[1]-h[1];let d=Math.hypot(dx,dy);d=Math.min(d,L.th+L.sh-0.5);const base=Math.atan2(dy,dx)/R;const a=Math.acos((L.th*L.th+d*d-L.sh*L.sh)/(2*L.th*d))/R;const k1=P(h,base-a,L.th),k2=P(h,base+a,L.th);const k=(k1[0]>k2[0])===fwd?k1:k2;return[k,t];}
function lerpPose(A,B,t){const o={};for(const k in A){const a=A[k],b=B[k];if(Array.isArray(a))o[k]=[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];else if(typeof a==='number'&&typeof b==='number')o[k]=a+(b-a)*t;else o[k]=a;}return o;}
function solve(p,pat,time){
 const hip=p.hip,s=P(hip,p.torso,L.t+(p.sh||0)),head=P(P(hip,p.torso,L.t),p.torso,15);
 const off=p.front?13:0,ho=p.front?7:0;
 const s1=[s[0]-off,s[1]],s2=[s[0]+off,s[1]],h1=[hip[0]-ho,hip[1]],h2=[hip[0]+ho,hip[1]];
 const e1=P(s1,p.a1,L.ua),w1=P(e1,p.f1,L.fa),e2=P(s2,p.a2,L.ua),w2=P(e2,p.f2,L.fa);
 let k1,an1,k2,an2;
 if(pat.ik){const th=time/pat.per*2*Math.PI,C=[118,140];const t1=[C[0]+16*Math.cos(th),C[1]+16*Math.sin(th)],t2=[C[0]-16*Math.cos(th),C[1]-16*Math.sin(th)];[k1,an1]=ik(h1,t1,true);[k2,an2]=ik(h2,t2,true);}
 else{k1=P(h1,p.t1,L.th);an1=P(k1,p.s1,L.sh);k2=P(h2,p.t2,L.th);an2=P(k2,p.s2,L.sh);}
 const fa1=p.ft1!=null?p.ft1:(p.s1!=null?p.s1-90:0),fa2=p.ft2!=null?p.ft2:(p.s2!=null?p.s2-90:0);
 const f1=P(an1,pat.ik?-10:fa1,L.ft),f2=P(an2,pat.ik?-10:fa2,L.ft);
 return{s,head,hip,s1,s2,h1,h2,e1,w1,e2,w2,k1,an1,f1,k2,an2,f2};
}
const pts=a=>a.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join(' ');
const NS='http://www.w3.org/2000/svg';
const ECCF=['squat','lunge','bulgarian','rdl','pushup','fly','pullover','skull','dip'];
const CYC=['run','tread','mountain','twist','plank','cycle','wallsit','bicycle','hollow'];
const HL={press:['chest'],incline:['chest'],fly:['chest'],pullover:['chest'],mpress:['chest'],cross:['chest'],pushup:['chest'],pulldown:['upper'],crow:['upper'],dbrow:['upper'],straight:['upper'],facepull:['delt'],rear:['delt'],lateral:['delt'],front:['delt'],ohp:['delt'],curl:['ua'],ccurl:['ua'],pushdown:['ua'],overhead:['ua'],kickback:['ua'],squat:['th','glute'],lunge:['th','glute'],bulgarian:['th','glute'],stepup:['th','glute'],legext:['th'],legcurl:['th'],rdl:['glute','th'],bridge:['glute','th'],calf:['shin'],crunch:['abs'],legraise:['abs'],twist:['abs'],ccrunch:['abs'],plank:['abs'],mountain:['abs'],cycle:['th'],run:['th','shin'],tread:['th','shin'],bentrow:['upper'],csrow:['upper'],superman:['abs','glute'],shrug:['upper'],upright:['delt'],skull:['ua'],dip:['ua'],wallsit:['th'],calfseat:['shin'],kickglute:['glute'],deadbug:['abs'],bicycle:['abs'],woodchop:['abs'],hollow:['abs'],revcrunch:['abs']};
const TRAIL={squat:'hip',lunge:'hip',bulgarian:'hip',stepup:'hip',bridge:'hip',calf:'hip',rdl:'s',legext:'an1',legcurl:'an1',legraise:'an1',crunch:'s',pushup:'s',ccrunch:'s'};
const PHASE_HE={con:'כיווץ · נשיפה',hold:'החזקה בשיא הכיווץ',ecc:'ירידה מבוקרת · שאיפה',pause:'מתיחה בתחתית',cyc:'קצב רציף',iso:'החזקה · נשימה רגילה'};
const ease=x=>0.5-0.5*Math.cos(Math.PI*Math.min(1,Math.max(0,x)));
function phaseAt(pid,pat,time){
 if(CYC.includes(pid)){const per=pat.per||2.6;const t=(1-Math.cos(2*Math.PI*time/per))/2;return{t,ph:pid==='plank'?'iso':'cyc',int:pid==='plank'?0.85:0.5+0.5*t,rep:Math.floor(time/per)+1};}
 const D={con:1.0,hold:0.4,ecc:1.7,pause:0.45};
 const seq=ECCF.includes(pid)?[['ecc',0,1],['pause',1,1],['con',1,0],['hold',0,0]]:[['con',0,1],['hold',1,1],['ecc',1,0],['pause',0,0]];
 const tot=D.con+D.hold+D.ecc+D.pause;let tt=time%tot;const rep=Math.floor(time/tot)+1;
 for(const [ph,a,b] of seq){const d=D[ph];if(tt<=d){const f=tt/d;return{t:a+(b-a)*ease(f),ph,int:ph==='con'?0.3+0.7*ease(f):ph==='hold'?1:ph==='ecc'?1-0.7*ease(f):0.3,rep};}tt-=d;}
 return{t:0,ph:'pause',int:.3,rep};}
const WS=[[0,10],[0.4,8.5],[0.78,12.5],[1,10]],WF=[[0,13],[0.4,11],[0.78,16],[1,17]];
function wAt(f,tab){for(let i=1;i<tab.length;i++){if(f<=tab[i][0]){const[a,wa]=tab[i-1],[b,wb]=tab[i];return wa+(wb-wa)*(f-a)/(b-a);}}return tab[tab.length-1][1];}
function torso(h,s,front,f0,f1,inset){const dx=s[0]-h[0],dy=s[1]-h[1],len=Math.hypot(dx,dy)||1,nx=-dy/len,ny=dx/len;const tab=front?WF:WS;const L1=[],L2=[];
 for(let i=0;i<=6;i++){const f=f0+(f1-f0)*i/6;const cx=h[0]+dx*f,cy=h[1]+dy*f,w=Math.max(1,wAt(f,tab)-inset);L1.push([cx+nx*w,cy+ny*w]);L2.push([cx-nx*w,cy-ny*w]);}
 return 'M'+L1.concat(L2.reverse()).map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L')+'Z';}
function figSVG(pid,cls,ctl){const pat=PATS[pid]||PATS.curl;return `<svg class="fig ${cls||''}" viewBox="0 0 240 180" data-pat="${pid}" ${ctl?'data-ctl="1"':''} role="img" aria-label="המחשת תנועה">${pat.props}<ellipse class="shd" cx="120" cy="172" rx="32" ry="3.5"/><polyline class="trl"/><g class="cbs"></g><g class="bd"></g><g class="hold"></g></svg>`;}
const FIGS=new Map();const VIS=new Set();
const io=('IntersectionObserver' in window)?new IntersectionObserver(es=>es.forEach(e=>{e.isIntersecting?VIS.add(e.target):VIS.delete(e.target)})):null;
function capsule(a,b,r1,r2){const dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||0.01,nx=-dy/l,ny=dx/l;const f=v=>v.toFixed(1);
 return `M${f(a[0]+nx*r1)} ${f(a[1]+ny*r1)}L${f(b[0]+nx*r2)} ${f(b[1]+ny*r2)}A${r2} ${r2} 0 0 0 ${f(b[0]-nx*r2)} ${f(b[1]-ny*r2)}L${f(a[0]-nx*r1)} ${f(a[1]-ny*r1)}A${r1} ${r1} 0 0 0 ${f(a[0]+nx*r1)} ${f(a[1]+ny*r1)}Z`;}
const part=(a,b,f0,f1)=>[[a[0]+(b[0]-a[0])*f0,a[1]+(b[1]-a[1])*f0],[a[0]+(b[0]-a[0])*f1,a[1]+(b[1]-a[1])*f1]];
function registerFigs(root){root.querySelectorAll('svg.fig').forEach(svg=>{if(FIGS.has(svg))return;const pid=PATS[svg.dataset.pat]?svg.dataset.pat:'curl';const pat=PATS[pid];const hl=HL[pid]||[];
 const bd=svg.querySelector('.bd');const mk=(tag,cls)=>{const el=document.createElementNS(NS,tag);el.setAttribute('class',cls);bd.appendChild(el);return el;};const has=k=>hl.includes(k);
 const E={};
 E.th2=mk('path','sk far');E.sh2=mk('path','sk far');E.ft2=mk('path','sk far');
 if(has('th'))E.hth2=mk('path','mu far');if(has('shin'))E.hsh2=mk('path','mu far');
 E.ua2=mk('path','sk far');E.fa2=mk('path','sk far');E.hn2=mk('circle','sk far');
 if(has('ua'))E.hua2=mk('path','mu far');if(has('delt'))E.hd2=mk('circle','mu far');
 E.nk=mk('path','sk');E.tor=mk('path','sk');
 if(has('chest')||has('upper')||has('abs'))E.ht=mk('path','mu');if(has('glute'))E.hg=mk('circle','mu');
 E.det=mk('path','det');E.hd=mk('ellipse','sk');
 E.th1=mk('path','sk');E.sh1=mk('path','sk');E.ft1=mk('path','sk');
 if(has('th'))E.hth1=mk('path','mu');if(has('shin'))E.hsh1=mk('path','mu');
 E.ua1=mk('path','sk');E.fa1=mk('path','sk');E.hn1=mk('circle','sk');
 if(has('ua'))E.hua1=mk('path','mu');if(has('delt'))E.hd1=mk('circle','mu');
 const ent={pid,pat,hl,el:E,cbs:svg.querySelector('.cbs'),hold:svg.querySelector('.hold'),gr:svg.querySelector('.gr'),shd:svg.querySelector('.shd'),trl:svg.querySelector('.trl'),tm:Math.random()*3,speed:1,paused:false,ctl:svg.dataset.ctl==='1'};
 if(ent.ctl)ent.tm=0;
 const nc=pat.hold==='cable2'?2:(pat.hold==='cable'||pat.hold==='cablefoot')?1:0;let c='';for(let i=0;i<nc;i++)c+='<line class="cb"/>';(pat.anc||[]).forEach(a=>c+=`<circle class="pul" cx="${a[0]}" cy="${a[1]}" r="5"/>`);ent.cbs.innerHTML=c;
 const DB='<g class="dbg"><rect class="dbb" x="-9" y="-1.6" width="18" height="3.2" rx="1.5"/><rect class="dbl" x="-11" y="-6" width="6" height="12" rx="2"/><rect class="dbl" x="5" y="-6" width="6" height="12" rx="2"/></g>';
 const nd={db2:2,db1:1,dbc:1,dbhip:1,dbknee:1,handle:2,cable:1,cable2:2,cablefoot:1}[pat.hold]||0;let h='';for(let i=0;i<nd;i++)h+=(pat.hold==='handle'||pat.hold.startsWith('cable'))?'<g class="dbg"><circle class="dbl" r="4.5"/></g>':DB;ent.hold.innerHTML=h;
 const tk=CYC.includes(pid)||pat.ik?null:(TRAIL[pid]||(pat.hold!=='none'?'w1':null));
 if(tk){const ptsA=[];for(let i=0;i<=20;i++){const j=solve(lerpPose(pat.A,pat.B,i/20),pat,0);ptsA.push(j[tk]);}ent.trl.setAttribute('points',pts(ptsA));}
 FIGS.set(svg,ent);if(io)io.observe(svg);else VIS.add(svg);drawFig(svg,ent,ent.tm);});}
const REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;
const seg=(el,a,b)=>{el.setAttribute('x1',a[0].toFixed(1));el.setAttribute('y1',a[1].toFixed(1));el.setAttribute('x2',b[0].toFixed(1));el.setAttribute('y2',b[1].toFixed(1));};
const circ=(el,p,r)=>{el.setAttribute('cx',p[0].toFixed(1));el.setAttribute('cy',p[1].toFixed(1));if(r)el.setAttribute('r',r);};
const cap=(el,a,b,r1,r2)=>el.setAttribute('d',capsule(a,b,r1,r2));
function drawFig(svg,e,time){const pat=e.pat,E=e.el;const ph=REDUCED&&!e.ctl?{t:1,ph:'hold',int:1,rep:1}:phaseAt(e.pid,pat,time);
 const p=pat.ik?pat.A:lerpPose(pat.A,pat.B,ph.t);const j=solve(p,pat,time);
 cap(E.th2,j.h2,j.k2,7.2,5.2);cap(E.sh2,j.k2,j.an2,5.2,3.6);cap(E.ft2,j.an2,j.f2,3.4,2.4);cap(E.ua2,j.s2,j.e2,5.4,4.2);cap(E.fa2,j.e2,j.w2,4.3,3.1);circ(E.hn2,j.w2,3.9);
 cap(E.nk,j.s,P(j.s,p.torso,8),4,3.6);E.tor.setAttribute('d',torso(j.hip,j.s,p.front,0,1,0));
 E.hd.setAttribute('cx',j.head[0].toFixed(1));E.hd.setAttribute('cy',j.head[1].toFixed(1));E.hd.setAttribute('rx',9.5);E.hd.setAttribute('ry',10.5);
 E.hd.setAttribute('transform',`rotate(${(p.torso+90).toFixed(0)} ${j.head[0].toFixed(1)} ${j.head[1].toFixed(1)})`);
 // anatomical contour: pec line & ab line along the torso
 {const h=j.hip,s=j.s,dx=s[0]-h[0],dy=s[1]-h[1],l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l;const at=(f,w)=>[h[0]+dx*f+nx*w,h[1]+dy*f+ny*w];const q=v=>v[0].toFixed(1)+' '+v[1].toFixed(1);
  E.det.setAttribute('d',p.front?`M${q(at(.66,-10))}Q${q(at(.6,0))} ${q(at(.66,10))}M${q(at(.52,0))}L${q(at(.12,0))}M${q(at(.42,-6))}L${q(at(.42,6))}M${q(at(.28,-6))}L${q(at(.28,6))}`:`M${q(at(.86,-3))}Q${q(at(.66,-6))} ${q(at(.6,2))}M${q(at(.4,-4))}Q${q(at(.25,-3))} ${q(at(.12,2))}`);}
 cap(E.th1,j.h1,j.k1,7.2,5.2);cap(E.sh1,j.k1,j.an1,5.2,3.6);cap(E.ft1,j.an1,j.f1,3.4,2.4);cap(E.ua1,j.s1,j.e1,5.4,4.2);cap(E.fa1,j.e1,j.w1,4.3,3.1);circ(E.hn1,j.w1,3.9);
 const op=(0.25+0.75*ph.int).toFixed(2),opf=(0.15+0.55*ph.int).toFixed(2);
 if(E.ht){const k=e.hl.includes('abs')?[0.1,0.5]:[0.55,0.93];E.ht.setAttribute('d',torso(j.hip,j.s,p.front,k[0],k[1],2.6));E.ht.style.opacity=op;}
 if(E.hg){circ(E.hg,j.hip,7.5);E.hg.style.opacity=op;}
 if(E.hua1){const[a1,b1]=part(j.s1,j.e1,.12,.86),[a2,b2]=part(j.s2,j.e2,.12,.86);cap(E.hua1,a1,b1,4.2,3.3);E.hua1.style.opacity=op;cap(E.hua2,a2,b2,4.2,3.3);E.hua2.style.opacity=opf;}
 if(E.hth1){const[a1,b1]=part(j.h1,j.k1,.1,.84),[a2,b2]=part(j.h2,j.k2,.1,.84);cap(E.hth1,a1,b1,6,4.4);E.hth1.style.opacity=op;cap(E.hth2,a2,b2,6,4.4);E.hth2.style.opacity=opf;}
 if(E.hsh1){const[a1,b1]=part(j.k1,j.an1,.1,.62),[a2,b2]=part(j.k2,j.an2,.1,.62);cap(E.hsh1,a1,b1,4.4,3.2);E.hsh1.style.opacity=op;cap(E.hsh2,a2,b2,4.4,3.2);E.hsh2.style.opacity=opf;}
 if(E.hd1){circ(E.hd1,j.s1,5.6);E.hd1.style.opacity=op;circ(E.hd2,j.s2,5.6);E.hd2.style.opacity=p.front?op:opf;}
 if(e.shd){const fx=(j.f1[0]+j.f2[0]+j.an1[0]+j.an2[0])/4;e.shd.setAttribute('cx',fx.toFixed(1));}
 const ls=e.cbs.querySelectorAll('.cb');ls.forEach((l,i)=>{const a=pat.anc[i]||pat.anc[0];const w=pat.hold==='cablefoot'?j.an1:i===0?j.w1:j.w2;seg(l,a,w);});
 const hs=e.hold.children;
 if(pat.hold==='cablefoot'){hs[0]&&hs[0].setAttribute('transform',`translate(${j.an1[0].toFixed(1)},${j.an1[1].toFixed(1)})`);}
 else if(pat.hold==='dbc'||pat.hold==='dbhip'||pat.hold==='dbknee'){const c=pat.hold==='dbknee'?[(j.k1[0]+j.h1[0])/2+12,j.k1[1]-6]:pat.hold==='dbhip'?[j.hip[0],j.hip[1]-9]:[(j.w1[0]+j.w2[0])/2,(j.w1[1]+j.w2[1])/2];hs[0]&&hs[0].setAttribute('transform',`translate(${c[0].toFixed(1)},${c[1].toFixed(1)})${pat.hold==='dbc'?' rotate(90)':''}`);}
 else for(let i=0;i<hs.length;i++){const w=i===0?j.w1:j.w2;const ang=i===0?p.f1:p.f2;hs[i].setAttribute('transform',`translate(${w[0].toFixed(1)},${w[1].toFixed(1)}) rotate(${((ang||0)+90).toFixed(0)})`);}
 if(e.gr&&pat.belt)e.gr.style.strokeDashoffset=((time*60)%26).toFixed(1);
 if(e.ctl){const a=document.getElementById('figphase'),r=document.getElementById('figrep'),b=document.getElementById('figbar');if(a){const lbl=PHASE_HE[ph.ph];if(a.textContent!==lbl){a.textContent=lbl;a.dataset.ph=ph.ph;}}if(r)r.textContent='חזרה '+ph.rep;if(b)b.style.width=(ph.int*100).toFixed(0)+'%';}
}
let lastF=0,prevT=0;function loop(ts){const dt=prevT?Math.min(0.1,(ts-prevT)/1000):0;prevT=ts;
 for(const svg of VIS){const e=FIGS.get(svg);if(e&&!e.paused)e.tm+=dt*e.speed;}
 if(ts-lastF>30){lastF=ts;for(const svg of VIS){if(!svg.isConnected){VIS.delete(svg);FIGS.delete(svg);continue;}const e=FIGS.get(svg);if(e)drawFig(svg,e,e.tm);}}
 if(!REDUCED||document.querySelector('svg[data-ctl]'))requestAnimationFrame(loop);else setTimeout(()=>requestAnimationFrame(loop),500);}
requestAnimationFrame(loop);

/* ===================== STATE & STORAGE ===================== */
let LS='gymlog.v1';
let S={settings:JSON.parse(JSON.stringify(DEF)),sessions:[],active:null};
let DB=null,UID=null,SYNC='local';
const UI={draft:null,selDay:null,lib:'all',q:'',metric:'1rm',range:28,ex:'',rest:null,audio:null};
function loadLocal(){try{const j=JSON.parse(localStorage.getItem(LS)||'null');if(j){S.settings=Object.assign(JSON.parse(JSON.stringify(DEF)),j.settings||{});S.sessions=j.sessions||[];S.active=j.active||null;}}catch(e){}}
function saveLocal(){try{localStorage.setItem(LS,JSON.stringify(S))}catch(e){}}
const chains={};
function dbPut(id,data){if(SB&&SBUSER){sbPut(id,data);return;}if(!DB||!UID)return;const ref=DB.collection('data/users/'+UID).doc(id);chains[id]=(chains[id]||Promise.resolve()).then(()=>data==null?ref.delete():ref.set(JSON.parse(JSON.stringify(data)))).catch(e=>{if(e&&e.code==='quota_exceeded')toast('האחסון מלא. ייצא גיבוי ומחק אימונים ישנים.');else console.warn(e);});}
function saveSettings(){saveLocal();dbPut('settings',S.settings);}
let actT=null;function saveActive(now){saveLocal();clearTimeout(actT);const f=()=>dbPut('active',S.active?{w:S.active}:null);if(now)f();else actT=setTimeout(f,900);}
function saveSession(s){saveLocal();dbPut('s-'+s.id,s);}
function delSession(id){S.sessions=S.sessions.filter(s=>s.id!==id);saveLocal();dbPut('s-'+id,null);}
/* ===================== LOCAL PROFILES (website, per device) ===================== */
const PROF_KEY='gym.profiles',CUR_KEY='gym.cur';
const lsGet=(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}};
const lsSet=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}};
let PROFILES=[],CURP=null;
async function pinHash(id,pin){const b=new TextEncoder().encode(id+':'+pin);if(crypto.subtle){const h=await crypto.subtle.digest('SHA-256',b);return [...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,'0')).join('');}return String(hash(id+pin));}
function useLocalProfiles(){return false;} // per-device profiles replaced by server accounts
function initProfiles(){if(!useLocalProfiles())return;PROFILES=lsGet(PROF_KEY,[]);
 if(!PROFILES.length){PROFILES=[{id:'p1',name:'משתמש ראשי',key:'gymlog.v1',pin:null,color:0}];lsSet(PROF_KEY,PROFILES);lsSet(CUR_KEY,'p1');}
 const cur=lsGet(CUR_KEY,null);const p=PROFILES.find(x=>x.id===cur);
 if(p&&!p.pin&&PROFILES.length===1){switchProfile(p.id,true);return;}
 if(p&&!p.pin&&!lsGet('gym.askeach',false)){switchProfile(p.id,true);return;}
 setTimeout(pickProfile,0);}
function switchProfile(id,silent){const p=PROFILES.find(x=>x.id===id);if(!p)return;if(CURP&&CURP.id!==id)saveLocal();CURP=p;LS=p.key;lsSet(CUR_KEY,id);
 S={settings:JSON.parse(JSON.stringify(DEF)),sessions:[],active:null};UI.draft=null;UI.mm=null;UI.rest=null;loadLocal();syncCustom();closeSheet();render();if(!silent)toast('שלום '+p.name);}
const PCOL=['#2f6bff','#22a6c2','#ff7a59','#9b6bff','#2fd27a','#f2c21a','#ff4d8d'];
const avatar=(p,big)=>`<span class="pav${big?' big':''}" style="background:${PCOL[(p.color||0)%PCOL.length]}">${esc((p.name||'?').trim().slice(0,1))}</span>`;
function pickProfile(){openSheet(`<div class="sh-top"><h1>מי מתאמן?</h1></div>
 <div class="pgrid">${PROFILES.map(p=>`<button class="pcard" data-act="ppick" data-v="${p.id}">${avatar(p,true)}<b>${esc(p.name)}</b>${p.pin?'<span class="small muted">🔒 קוד</span>':''}</button>`).join('')}<button class="pcard add" data-act="pnew">${'<span class="pav big" style="background:#18357a">+</span>'}<b>משתמש חדש</b></button></div>
 <p class="small muted" style="margin:0">כל משתמש מקבל אימונים, תוכנית והיסטוריה משלו. הנתונים נשמרים במכשיר הזה בלבד.</p>`,'full');}
function profileForm(p){openSheet(`<div class="sh-top"><h1>${p?'עריכת משתמש':'משתמש חדש'}</h1><button class="pillbtn" data-act="${PROFILES.length&&CURP?'closesheet':'pback'}">חזרה</button></div>
 <form id="pform" class="form" data-id="${p?p.id:''}"><label class="wide">שם<input id="pf-name" required maxlength="24" value="${esc(p?p.name:'')}" placeholder="לדוגמה: אילן"></label>
 <label class="wide">קוד אישי (4 ספרות, לא חובה)<input id="pf-pin" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" autocomplete="off" placeholder="${p&&p.pin?'השאר ריק כדי לשמור את הקוד הקיים':'בלי קוד'}" dir="ltr"></label>
 ${p&&p.pin?'<label class="wide" style="flex-direction:row;align-items:center;gap:8px"><input type="checkbox" id="pf-nopin" style="width:auto">הסר את הקוד</label>':''}
 <div class="wide"><div class="label">צבע</div><div class="chips">${PCOL.map((c,i)=>`<button type="button" class="chip pcol" data-act="pcol" data-v="${i}" aria-pressed="${(p?p.color||0:PROFILES.length%PCOL.length)===i}" style="background:${c};min-width:40px" aria-label="צבע ${i+1}"></button>`).join('')}</div></div>
 <button class="btn primary wide" type="submit">${p?'שמור':'צור משתמש'}</button>${p&&PROFILES.length>1?`<button type="button" class="btn danger wide" data-act="pdel" data-v="${p.id}">מחק את המשתמש ואת כל האימונים שלו</button>`:''}</form>
 <p class="small muted" style="margin:0">הקוד מונע כניסה בטעות לפרופיל של מישהו אחר. הוא לא הצפנה: מי שיש לו גישה למכשיר יכול לגשת לנתונים.</p>`,'full');}
async function saveProfileForm(){const f=$('#pform');const id=f.dataset.id;const name=$('#pf-name').value.trim();const pin=$('#pf-pin').value.trim();if(!name){toast('צריך שם');return;}
 if(pin&&!/^\d{4}$/.test(pin)){toast('הקוד צריך להיות 4 ספרות');return;}const colBtn=f.querySelector('[data-act="pcol"][aria-pressed="true"]');const color=colBtn?+colBtn.dataset.v:0;
 if(id){const p=PROFILES.find(x=>x.id===id);p.name=name;p.color=color;if($('#pf-nopin')&&$('#pf-nopin').checked)p.pin=null;else if(pin)p.pin=await pinHash(id,pin);lsSet(PROF_KEY,PROFILES);if(CURP&&CURP.id===id)CURP=p;closeSheet();render();toast('נשמר');}
 else{const nid='p'+uid();const p={id:nid,name,key:'gymlog.p.'+nid,pin:pin?await pinHash(nid,pin):null,color};PROFILES.push(p);lsSet(PROF_KEY,PROFILES);switchProfile(nid);setTimeout(openQ,300);}}
function pinPrompt(p){openSheet(`<div class="sh-top"><h1>${avatar(p)} ${esc(p.name)}</h1><button class="pillbtn" data-act="pback">חזרה</button></div>
 <form id="pinf" class="form" data-id="${p.id}"><label class="wide">קוד אישי<input id="pin-in" inputmode="numeric" maxlength="4" autocomplete="off" dir="ltr" style="font-size:1.6rem;letter-spacing:.5em;text-align:center"></label><button class="btn primary wide" type="submit">כניסה</button><p class="wide small" id="pin-msg" style="margin:0;color:#ff8a80"></p></form>`,'full');setTimeout(()=>{const i=$('#pin-in');i&&i.focus();},50);}
function profileCard(){if(!useLocalProfiles()||!CURP)return '';
 return `<section class="card"><h2>משתמש</h2><div class="row between"><div class="row">${avatar(CURP,true)}<div><b>${esc(CURP.name)}</b><div class="small muted">${PROFILES.length} משתמשים במכשיר הזה${CURP.pin?' · מוגן בקוד':''}</div></div></div></div>
 <div class="two"><button class="btn primary" data-act="pswitch">החלף משתמש</button><button class="btn" data-act="pedit">ערוך פרטים וקוד</button></div>
 <label class="row small muted" style="gap:8px"><input type="checkbox" id="pf-askeach" ${lsGet('gym.askeach',false)?'checked':''} style="width:auto">לשאול "מי מתאמן?" בכל פתיחה</label></section>`;}

/* ===================== ACCOUNTS (own backend: Next.js API + Postgres) ===================== */
let SB=null,SBUSER=null;const sbChains={}; // SB = backend reachable
async function api(path,opt){const r=await fetch('/api'+path,Object.assign({credentials:'same-origin',headers:{'content-type':'application/json'}},opt||{}));
 const j=await r.json().catch(()=>({}));if(!r.ok){const e=new Error(j.error||('HTTP '+r.status));e.status=r.status;throw e;}return j;}
async function initSupa(){if(window.claude)return false;
 let me;try{me=(await api('/auth/me')).user;}catch(e){toast('אין חיבור לשרת החשבונות. ממשיך במצב מקומי.');return false;}
 SB=true;if(me){SBUSER=me;await sbLoad();}else{let g=null;try{g=localStorage.getItem('gym.guest');}catch(e){}if(!g)openAuth();}
 return true;}
function sbPut(id,data){const run=()=>data==null?api('/docs/'+encodeURIComponent(id),{method:'DELETE'}):api('/docs/'+encodeURIComponent(id),{method:'PUT',body:JSON.stringify({data})});
 sbChains[id]=(sbChains[id]||Promise.resolve()).then(run).catch(e=>{console.warn(e);if(e.status===401){SBUSER=null;setSync('local');}toast('השמירה בשרת נכשלה. הנתונים שמורים במכשיר וינסו שוב בשמירה הבאה.');});}
async function sbLoad(){setSync('wait');let data;try{data=(await api('/docs')).docs;}catch(e){console.warn(e);setSync('local');toast('לא הצלחתי לטעון את הנתונים מהחשבון');return;}
 if(!data.length){ // first login on this account: upload what is on this device
  const rows=[{id:'settings',data:S.settings}];S.sessions.forEach(x=>rows.push({id:'s-'+x.id,data:x}));if(S.active)rows.push({id:'active',data:{w:S.active}});
  try{await api('/docs',{method:'POST',body:JSON.stringify({docs:rows})});}catch(e){console.warn(e);}
  if(S.sessions.length)toast(`${S.sessions.length} אימונים מהמכשיר הועלו לחשבון`);}
 else{let st=null,act=null,ss=[];data.forEach(d=>{if(d.id==='settings')st=d.data;else if(d.id==='active')act=d.data&&d.data.w||null;else if(d.id.startsWith('s-'))ss.push(d.data);});
  if(st)S.settings=Object.assign(JSON.parse(JSON.stringify(DEF)),st);S.sessions=ss;S.active=act;saveLocal();syncCustom();UI.draft=null;}
 setSync('supa');render();}
function openAuth(mode){mode=mode||'login';
 openSheet(`<div class="sh-top"><h1>${mode==='signup'?'יצירת חשבון':'התחברות'}</h1><button class="pillbtn" data-act="authguest">בלי חשבון</button></div>
 <p class="muted" style="margin:0">${mode==='signup'?'חשבון שומר את האימונים בשרת ומסנכרן אותם בין הטלפון למחשב. כל משתמש רואה רק את הנתונים שלו.':'התחבר כדי לראות את האימונים שלך מכל מכשיר.'}</p>
 <form id="authf" class="form" data-mode="${mode}">
 <label class="wide">אימייל<input id="au-email" type="email" autocomplete="email" required dir="ltr"></label>
 <label class="wide">סיסמה${mode==='signup'?' (לפחות 8 תווים)':''}<input id="au-pass" type="password" autocomplete="${mode==='signup'?'new-password':'current-password'}" minlength="${mode==='signup'?8:6}" required dir="ltr"></label>
 <button class="btn primary wide" type="submit" id="au-go">${mode==='signup'?'צור חשבון':'התחבר'}</button><p class="wide small" id="au-msg" style="margin:0;color:#ffb15e"></p></form>
 <div class="row between"><button class="btn sm ghost" data-act="authmode" data-v="${mode==='signup'?'login':'signup'}">${mode==='signup'?'יש לי חשבון, להתחברות':'אין לך חשבון? הרשמה'}</button></div>
 <p class="small muted" style="margin:0">אפשר להמשיך בלי חשבון. הנתונים יישמרו רק במכשיר הזה, ותוכל להתחבר מאוחר יותר מהפרופיל. האימונים שכבר במכשיר יעלו לחשבון בהתחברות הראשונה.</p>`,'full');}
const AUTH_HE={'invalid_credentials':'אימייל או סיסמה שגויים','email_taken':'כבר קיים חשבון עם האימייל הזה. נסה להתחבר','weak_password':'הסיסמה צריכה לפחות 8 תווים','bad_email':'כתובת אימייל לא תקינה'};
async function doAuth(mode){const email=$('#au-email').value.trim(),pass=$('#au-pass').value,msg=$('#au-msg'),btn=$('#au-go');btn.disabled=true;msg.textContent='';
 try{const r=await api('/auth/'+(mode==='signup'?'signup':'login'),{method:'POST',body:JSON.stringify({email,password:pass})});SBUSER=r.user;closeSheet();await sbLoad();}
 catch(e){msg.textContent=AUTH_HE[e.message]||e.message||'משהו השתבש, נסה שוב';}btn.disabled=false;}
function accountCard(){if(window.claude||!SB)return '';
 return `<section class="card"><h2>חשבון</h2>${SBUSER?`<div class="row between"><div><b dir="ltr">${esc(SBUSER.email)}</b><div class="small muted">האימונים נשמרים בשרת ומסתנכרנים בין מכשירים.</div></div><button class="btn sm danger" data-act="signout">התנתק</button></div>`:`<p class="small muted" style="margin:0">כרגע הנתונים שמורים רק במכשיר הזה.</p><div class="two"><button class="btn primary" data-act="authopen" data-v="login">התחבר</button><button class="btn" data-act="authopen" data-v="signup">צור חשבון</button></div>`}</section>`;}

async function initCloud(){
 if(!window.claude||typeof window.claude.use!=='function'){if(!(await initSupa()))setSync('local');return;}
 try{const [db,user]=await Promise.all([claude.use('db'),claude.use('user')]);
  if(!db||!user){setSync('local');return;}
  const id=await user.id();if(!id){setSync('local');return;}
  DB=db;UID=id;const tm=setTimeout(()=>setSync('wait'),10000);
  const snap=await db.collection('data/users/'+id).get();clearTimeout(tm);
  if(snap.empty){if(S.sessions.length||S.active){saveSettings();S.sessions.forEach(s=>dbPut('s-'+s.id,s));saveActive(true);}}
  else{let st=null,act=null,ss=[];snap.docs.forEach(d=>{if(!d.exists)return;const v=JSON.parse(JSON.stringify(d.data()));if(d.id==='settings')st=v;else if(d.id==='active')act=v.w||null;else if(d.id.startsWith('s-'))ss.push(v);});
   if(st)S.settings=Object.assign(JSON.parse(JSON.stringify(DEF)),st);S.sessions=ss;S.active=act;saveLocal();syncCustom();}
  setSync('cloud');render();
 }catch(e){console.warn(e);setSync('local');}
}
function setSync(s){SYNC=s;const el=document.getElementById('sync');if(el)el.outerHTML=syncPill();}
const syncPill=()=>CURP&&useLocalProfiles()?`<button id="sync" class="pill" data-act="pswitch" style="cursor:pointer">${avatar(CURP)} ${esc(CURP.name)}</button>`:`<span id="sync" class="pill ${SYNC==='cloud'||SYNC==='supa'?'on':''}">${SYNC==='supa'?'מחובר · '+esc((SBUSER&&SBUSER.email||'').split('@')[0]):SYNC==='cloud'?'מסונכרן לחשבון':SYNC==='wait'?'ממתין לחיבור…':'נשמר במכשיר'}</span>`;

/* ===================== HELPERS ===================== */
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const pad=n=>String(n).padStart(2,'0');
const dstr=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const today=()=>dstr(new Date());
const fmtW=w=>w===''||w==null||isNaN(w)?'':(Math.round(w*10)/10).toString();
const heDate=(s,o)=>new Intl.DateTimeFormat('he-IL',o||{weekday:'long',day:'numeric',month:'long'}).format(new Date(s+'T12:00:00'));
const mmss=s=>{s=Math.max(0,Math.round(s));return Math.floor(s/60)+':'+pad(s%60);};
function toast(msg){const t=$('#toast');t.innerHTML=`<div class="toast" role="status">${esc(msg)}</div>`;clearTimeout(toast.t);toast.t=setTimeout(()=>t.innerHTML='',2600);}
const incOf=ex=>ex.eq.includes('mt')?+S.settings.mtInc||5:ex.eq.includes('db')?+S.settings.dbInc||2:0;
const roundTo=(x,inc)=>inc?Math.max(inc,Math.round(x/inc)*inc):Math.round(x);
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0)/4294967296;}
function rangeFor(ex,goal){if(ex.type==='time')return goal==='strength'?[30,45]:goal==='endure'?[45,75]:[30,60];if(ex.type==='bw')return goal==='strength'?[8,12]:goal==='endure'?[15,25]:[10,15];
 if(goal==='strength')return ex.k==='c'?[4,6]:[8,10];if(goal==='endure')return[15,20];return ex.k==='c'?[8,12]:[10,15];}
const setsFor=(ex,goal)=>goal==='strength'&&ex.k==='c'?4:3;
function restFor(ex,goal){if(ex.a==='core')return 45;if(goal==='strength')return ex.k==='c'?150:90;if(goal==='endure')return 45;return ex.k==='c'?90:60;}
const GOALS={strength:'כוח',hyper:'מסה',endure:'סיבולת'};
const sorted=()=>S.sessions.slice().sort((a,b)=>(b.start||0)-(a.start||0));
function perfs(exId){const out=[];for(const s of sorted()){if(s.type!=='strength')continue;for(const it of s.items||[]){if(it.ex!==exId)continue;const d=(it.sets||[]).filter(x=>x.done&&+x.r>0);if(d.length)out.push({date:s.date,start:s.start,sets:d,range:it.range});}}return out;}
function lastDoneMap(){const m={};for(const s of S.sessions)if(s.type==='strength')for(const it of s.items||[])if((it.sets||[]).some(x=>x.done))m[it.ex]=Math.max(m[it.ex]||0,s.start||0);return m;}
const e1rm=(w,r)=>w>0?w*(1+r/30):0;
function recommend(exId,range){const ex=EXM[exId];const ps=perfs(exId);const inc=incOf(ex);
 if(!ps.length){return{w:null,r:range[1],kind:'first',why:ex.type==='w'?`פעם ראשונה: בחר משקל שמאפשר ${range[1]} חזרות נקיות עם עוד 2 ברזרבה.`:'פעם ראשונה: עבוד בטכניקה מלאה.'};}
 const last=ps[0].sets;const w=Math.max(...last.map(s=>+s.w||0));const reps=last.map(s=>+s.r||0);const avg=reps.reduce((a,b)=>a+b,0)/reps.length;
 const allTop=reps.length>=2&&reps.every(r=>r>=range[1]);const below=reps.some(r=>r<range[0]);
 const prevBelow=ps[1]&&ps[1].sets.some(s=>(+s.r||0)<range[0]);
 if(ex.type!=='w'){if(allTop)return{w:w||null,r:range[1]+(ex.type==='time'?10:2),kind:'up',why:ex.type==='time'?'עמדת בכל הסטים, מוסיפים 10 שניות.':'סיימת את כל הסטים בטווח העליון, מוסיפים 2 חזרות או משקולת.'};return{w:w||null,r:Math.min(range[1],Math.round(avg)+1),kind:'same',why:'מוסיפים חזרה אחת מהפעם הקודמת.'};}
 if(allTop)return{w:roundTo(w+inc,inc),r:range[0],kind:'up',why:`השלמת ${range[1]} חזרות בכל הסטים, עולים ב-${inc} ק״ג.`};
 if(below&&prevBelow)return{w:roundTo(w*0.9,inc),r:range[1],kind:'down',why:'פעמיים ברצף מתחת לטווח: יורדים 10% ובונים מחדש.'};
 return{w,r:Math.min(range[1],Math.max(range[0],Math.round(avg)+1)),kind:'same',why:`אותו משקל, מכוונים ל-${Math.min(range[1],Math.max(range[0],Math.round(avg)+1))} חזרות.`};}
function genDraft(areas,goal,dur,seedExtra){
 const order=['legs','chest','back','shoulders','triceps','biceps','core'];areas=order.filter(a=>areas.includes(a));
 if(!areas.length)return{areas,goal,dur,items:[]};
 const total=dur<=30?4:dur<=45?5:dur<=60?6:7;const w=a=>a==='core'?0.7:['biceps','triceps'].includes(a)?1:2;
 const q={};areas.forEach(a=>q[a]=1);let left=total-areas.length;
 while(left>0){let best=areas[0],bv=-1;areas.forEach(a=>{const v=w(a)/q[a];if(v>bv){bv=v;best=a;}});q[best]++;left--;}
 const ld=lastDoneMap();const seed=today()+(seedExtra||'');const items=[];
 areas.forEach(a=>{const pool=EX.filter(e=>e.a===a).sort((x,y)=>((ld[x.id]||0)-(ld[y.id]||0))||((x.type==='w'?0:1)-(y.type==='w'?0:1))||(x.k===y.k?0:x.k==='c'?-1:1)||(hash(seed+x.id)-hash(seed+y.id)));
  const pick=pool.slice(0,Math.min(q[a],pool.length));pick.sort((x,y)=>x.k===y.k?0:x.k==='c'?-1:1);pick.forEach(e=>items.push(e.id));});
 return{areas,goal,dur,items};}
function makeItem(exId,goal,ov){const ex=EXM[exId];const range=ov?ov.range:rangeFor(ex,goal);const rec=recommend(exId,range);if(ov){if(ov.w)rec.w=ov.w;rec.r=range[1];if(ov.tip){rec.why='מאמן AI: '+ov.tip;rec.kind='ai';}}const sets=[];for(let i=0;i<(ov?ov.sets:setsFor(ex,goal));i++)sets.push({tw:rec.w,tr:rec.r,w:rec.w==null?'':rec.w,r:'',done:false});return{ex:exId,range,rest:restFor(ex,goal),rec,sets};}
const TECH=[{id:'drop',he:'דרופ סט',d:'בסט האחרון: הגע לכשל, הורד 20–30% מהמשקל והמשך עד כשל.'},{id:'tempo',he:'טמפו 3-1-1',d:'3 שניות ירידה, שנייה עצירה בתחתית, שנייה עלייה.'},{id:'pause',he:'החזקה בכיווץ',d:'החזק 2 שניות בשיא הכיווץ בכל חזרה.'},{id:'rp',he:'מנוחה-עצירה',d:'בסט האחרון: כשל, 15 שניות מנוחה, עוד 2–4 חזרות.'},{id:'myo',he:'חצאי חזרות',d:'בסוף הסט האחרון: 5 חצאי חזרות בטווח המתיחה.'},{id:'super',he:'סופרסט',d:'בצע ברצף עם התרגיל הבא בלי מנוחה ביניהם.'}];
function techFor(id,idx,n,goal){if(goal==='strength')return null;const ex=EXM[id];if(!ex||ex.type!=='w')return null;const seed=hash(today()+id);
 if(ex.k==='i'&&idx>=n-2&&seed<0.75)return TECH[Math.floor(hash(id+today())*5)];if(ex.k==='c'&&seed<0.25)return TECH[1];return null;}
const volOf=s=>(s.items||[]).reduce((t,it)=>t+(EXM[it.ex]&&EXM[it.ex].type==='time'?0:(it.sets||[]).filter(x=>x.done).reduce((a,x)=>a+(+x.w||0)*(+x.r||0),0)),0);
const doneSets=s=>(s.items||[]).reduce((t,it)=>t+(it.sets||[]).filter(x=>x.done).length,0);
const totalSets=s=>(s.items||[]).reduce((t,it)=>t+(it.sets||[]).length,0);
const zoneOf=hr=>{const p=hr/(+S.settings.maxHr||180);return !hr?'':p<.6?'אזור 1':p<.7?'אזור 2':p<.8?'אזור 3':p<.9?'אזור 4':'אזור 5';};
const paceOf=(min,km)=>km>0&&min>0?mmss(min*60/km)+' לק״מ':'';

/* ===================== VIEWS ===================== */
const ICONS={
 today:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/></svg>',
 workout:'<svg viewBox="0 0 24 24"><path d="M3 10v4M6 7v10M18 7v10M21 10v4M6 12h12"/></svg>',
 library:'<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>',
 stats:'<svg viewBox="0 0 24 24"><path d="M5 20V12M10 20V6M15 20v-9M20 20V9"/></svg>',
 prefs:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>'};
const TABS=[['today','היום'],['workout','אימון'],['library','תרגילים'],['stats','אנליטיקס'],['prefs','פרופיל']];
function route(){const h=location.hash.slice(1);return TABS.some(t=>t[0]===h)?h:'today';}
function go(r){if(location.hash.slice(1)===r)render();else location.hash=r;window.scrollTo(0,0);}
function renderTabs(){const r=route();$('#tabs').innerHTML=TABS.map(([id,he])=>`<a href="#${id}" ${r===id?'aria-current="page"':''}>${ICONS[id]}<span>${he}</span>${id==='workout'&&S.active?'<i class="dot"></i>':''}</a>`).join('');}
function render(){renderTabs();const r=route();const app=$('#app');
 app.innerHTML=r==='workout'?vWorkout():r==='library'?vLibrary():r==='stats'?vStats():r==='prefs'?vPrefs():vToday();
 registerFigs(app);renderRest();}

function ensureDraft(){if(UI.draft)return;const dow=new Date().getDay();UI.selDay=dow;const pl=S.settings.plan[dow]||{};const areas=pl.areas||[];UI.draft=genDraft(areas,S.settings.goal,+S.settings.dur);}
function vToday(){ensureDraft();const d=UI.draft;const dow=new Date().getDay();const plan=S.settings.plan;const sel=plan[UI.selDay]||{};
 let h=`<div class="top"><div><div class="eyebrow">${heDate(today())}</div><h1>${esc(sel.l||'אימון חופשי')}</h1></div>${syncPill()}</div>`;
 if(S.active)h+=`<div class="banner"><span>יש לך אימון פתוח · ${doneSets(S.active)}/${totalSets(S.active)} סטים</span><button class="btn sm" data-act="nav" data-to="workout" style="background:#1b1206;color:#fff;border-color:#1b1206">המשך</button></div>`;
 h+=`<section class="card"><div class="row between"><h2>התוכנית השבועית</h2><button class="btn sm" style="background:linear-gradient(180deg,#22a6c2,#1786a1);border-color:#3cc4de" data-act="openq">${S.settings.q?'עדכן תוכנית':'צור תוכנית מותאמת'}</button></div><span class="small muted">הקש על יום כדי לטעון אותו</span><div class="week">${plan.map((p,i)=>`<button class="day ${i===dow?'today':''} ${i===UI.selDay?'sel':''}" data-act="day" data-i="${i}" aria-pressed="${i===UI.selDay}"><b>${DAYS[i]}</b><span>${esc(p.l||'')}</span></button>`).join('')}</div></section>`;
 if(sel.cardio){const c=CARDIO[sel.cardio];h+=`<section class="card"><div class="row between"><h2>קרדיו: ${c.he}</h2><span class="tag">${esc(c.plans[0].he)}</span></div>${figSVG(c.p)}<p class="muted" style="margin:0">${esc(c.plans[0].d)}</p><button class="btn primary block" data-act="cardio" data-k="${sel.cardio}">תעד ${c.he}</button></section>`;}
 h+=`<section class="card"><h2>אזורים לאימון כוח</h2><div class="chips">${AREAS.map(a=>`<button class="chip" data-act="area" data-a="${a.id}" aria-pressed="${d.areas.includes(a.id)}">${a.he}</button>`).join('')}</div>
 <div class="label">מטרה</div><div class="seg">${Object.entries(GOALS).map(([k,v])=>`<button data-act="goal" data-g="${k}" aria-pressed="${d.goal===k}">${v}</button>`).join('')}</div>
 <div class="label">משך משוער</div><div class="seg">${[30,45,60,75].map(v=>`<button data-act="dur" data-v="${v}" aria-pressed="${+d.dur===v}">${v} דק׳</button>`).join('')}</div></section>`;
 h+=coachCard();
 if(d.items.length){const[pm,sm]=draftMuscles(d.items);const rec=recovery();const tired=pm.filter(m=>rec[m]<60);
  h+=`<section class="card"><div class="row between"><h2>${d.ai?'<span class="spark">✦</span> '+esc(d.ai.title):'האימון שנבנה לך'}</h2><button class="btn sm ghost" data-act="reshuffle">ערבב תרגילים</button></div>${d.ai?`<div class="aiout small">${esc(d.ai.why)}</div>`:''}
 ${bodyMap(targetColor(pm,sm))}<div class="mlist">${pm.map(m=>`<span class="mchip r">${MUS[m]}</span>`).join('')}${sm.map(m=>`<span class="mchip a">${MUS[m]}</span>`).join('')}</div>
 ${tired.length?`<div class="mchip a" style="border-radius:14px;padding:8px 12px">שים לב: ${tired.map(m=>MUS[m]+' '+rec[m]+'%').join(', ')} עדיין בהתאוששות. שקול להוריד עצימות או לבחור אזור אחר.</div>`:''}<div class="plan">${d.items.map((id,i)=>{const ex=EXM[id];const rg=rangeFor(ex,d.goal);const rc=recommend(id,rg);const unit=ex.type==='time'?'שנ׳':'חזרות';
   const ov=d.ai&&d.ai.ov[id];
   return `<div class="pi pd"><div class="pcol"><button class="figbtn" data-act="exinfo" data-ex="${id}" aria-label="פרטי ${esc(ex.he)}">${figSVG(ex.p)}</button><button class="btn sm" data-act="swapdraft" data-i="${i}">החלף</button></div><div class="ptext"><h3>${esc(ex.he)}</h3><div class="meta">${ov?`${ov.sets} סטים × ${ov.range[0]}–${ov.range[1]} ${unit}${ov.w?` · ${fmtW(ov.w)} ק״ג`:''}`:`${setsFor(ex,d.goal)} סטים × ${rg[0]}–${rg[1]} ${unit}${rc.w?` · ${fmtW(rc.w)} ק״ג`:''}`}</div>${ov&&ov.tip?`<div class="meta" style="color:#7cc4ff">✦ ${esc(ov.tip)}</div>`:''}${(()=>{const tc=techFor(id,i,d.items.length,d.goal);return tc?`<div class="meta" style="color:#ffb15e">⚡ ${tc.he}</div>`:'';})()}<span class="rec ${rc.kind==='first'?'first':rc.kind==='down'?'down':''}">${rc.kind==='up'?'▲ עלייה':rc.kind==='down'?'▼ הורדה':rc.kind==='first'?'חדש':'= שמירה'}</span></div></div>`;}).join('')}</div>
  <button class="btn primary block" data-act="start" ${S.active?'disabled':''}>${S.active?'סיים קודם את האימון הפתוח':'התחל אימון'}</button></section>`;}
 else h+=`<section class="card"><p class="empty" style="margin:0">בחר לפחות אזור אחד כדי לבנות אימון כוח.</p></section>`;
 h+=`<section class="card"><h2>קרדיו</h2><div class="cardio3">${Object.entries(CARDIO).map(([k,c])=>`<button class="cbtn" data-act="cardio" data-k="${k}">${figSVG(c.p)}<span>${c.he}</span></button>`).join('')}</div>
 <label class="btn block" for="garmin">ייבוא פעילויות מגרמין (CSV)</label><input id="garmin" type="file" accept=".csv,text/csv" hidden>
 <p class="small muted" style="margin:0">ב-Garmin Connect: פעילויות ← כל הפעילויות ← ייצוא CSV. ריצות, הליכון ורכיבות ייכנסו להיסטוריה עם מרחק, זמן ודופק.</p></section>`;
 return h;}

function vWorkout(){const a=S.active;if(!a)return `<div class="top"><h1>אימון</h1>${syncPill()}</div><section class="card"><p class="empty">אין אימון פתוח כרגע.</p><button class="btn primary block" data-act="nav" data-to="today">לבניית אימון</button></section>`;
 const ds=doneSets(a),ts=totalSets(a);
 let h=`<div class="wk-head"><div><div class="eyebrow">${a.areas.map(x=>AREA_HE[x]).join(' · ')} · ${GOALS[a.goal]}</div><b class="num" id="elapsed" style="font-family:var(--display);font-size:1.3rem">${mmss((Date.now()-a.start)/1000)}</b></div><div style="flex:1;max-width:160px"><div class="small muted num">${ds}/${ts} סטים</div><div class="prog"><i style="width:${ts?ds/ts*100:0}%"></i></div></div><button class="btn sm primary" data-act="finish">סיום</button></div>`;
 a.items.forEach((it,i)=>{const ex=EXM[it.ex];const unit=ex.type==='time'?'שניות':'חזרות';const vid=S.settings.videos[ex.id];
  h+=`<article class="card ex"><div class="ex-top"><button class="figbtn" data-act="exinfo" data-ex="${ex.id}" aria-label="הגדל הדגמה של ${esc(ex.he)}">${figSVG(ex.p)}</button><div style="display:flex;flex-direction:column;gap:6px"><h3>${i+1}. ${esc(ex.he)}</h3><div class="small muted">${esc(ex.mus)}</div><div class="tags">${ex.eq.map(q=>`<span class="tag">${EQ[q]}</span>`).join('')}<span class="tag">מנוחה ${it.rest} שנ׳</span></div>${it.tech?`<div class="small" style="color:#ffb15e;border:1px solid #7a4a1c;background:#2a1806;border-radius:12px;padding:6px 10px">⚡ <b>${it.tech.he}:</b> ${esc(it.tech.d)}</div>`:''}
   <span class="rec ${it.rec.kind==='first'?'first':it.rec.kind==='down'?'down':''}" ${it.rec.kind==='ai'?'style="background:#08203f;color:#9fd2ff;border-color:#2a5fb0"':''}>${it.rec.kind==='up'?'▲':it.rec.kind==='down'?'▼':it.rec.kind==='first'?'●':it.rec.kind==='ai'?'✦':'='} ${esc(it.rec.why)}</span></div></div>
   <details class="how"><summary>איך לבצע נכון</summary><ol>${ex.cues.map(c=>`<li>${esc(c)}</li>`).join('')}</ol><div class="warn small" style="margin-top:8px">טעויות נפוצות: ${ex.err.map(esc).join(' · ')}</div>
   <div class="row" style="margin-top:10px">${videoBtn(ex)}<button class="btn sm ghost" data-act="exinfo" data-ex="${ex.id}">היסטוריה ופרטים</button></div></details>
   <div class="sets">${it.sets.map((s,j)=>`<div class="set ${s.done?'done':''}"><span class="sn">${j+1}</span><span class="tg">יעד<br>${s.tw?fmtW(s.tw)+'×':''}${s.tr||it.range[1]}</span>
    <label class="fld"><input id="w-${i}-${j}" inputmode="decimal" data-f="w" data-i="${i}" data-s="${j}" value="${fmtW(s.w)}" placeholder="${ex.type==='w'?'–':'0'}" aria-label="משקל סט ${j+1}"><span>ק״ג</span></label>
    <label class="fld"><input id="r-${i}-${j}" inputmode="numeric" data-f="r" data-i="${i}" data-s="${j}" value="${s.r}" placeholder="${s.tr||it.range[1]}" aria-label="${unit} סט ${j+1}"><span>${unit}</span></label>
    <button class="chk" data-act="done" data-i="${i}" data-s="${j}" aria-pressed="${!!s.done}" aria-label="סמן סט ${j+1} כבוצע">✓</button></div>`).join('')}</div>
   <div class="row"><button class="btn sm" data-act="addset" data-i="${i}">+ סט</button><button class="btn sm" data-act="rmset" data-i="${i}">− סט</button><button class="btn sm" data-act="adj" data-i="${i}" data-d="-1">קל יותר</button><button class="btn sm" data-act="adj" data-i="${i}" data-d="1">כבד יותר</button><button class="btn sm ghost" data-act="swap" data-i="${i}">החלף תרגיל</button><button class="btn sm ghost danger" data-act="rmex" data-i="${i}">הסר</button></div></article>`;});
 h+=`${doneSets(a)?`<section class="card"><div class="row between"><h2>שרירים שעבדו עד עכשיו</h2><button class="btn sm" data-act="nav" data-to="stats">מפה מלאה</button></div>${(()=>{const L=muscleLoad('active');return bodyMap(loadColor(L,'active'));})()}</section>`:''}
 <section class="card"><button class="btn block" data-act="addex">+ הוסף תרגיל</button><label class="label" for="wnote">הערות לאימון</label><textarea id="wnote" class="full" rows="2" data-f="note" placeholder="איך הרגשת, כאבים, ציוד…">${esc(a.note||'')}</textarea><div class="row"><button class="btn primary" data-act="finish" style="flex:1">סיים ושמור</button><button class="btn danger" data-act="discard">בטל אימון</button></div></section>`;
 return h;}

function vLibrary(){const q=UI.q.trim();const favs=S.settings.favs||[];const list=EX.filter(e=>(UI.lib==='all'||(UI.lib==='fav'?favs.includes(e.id):e.a===UI.lib))&&(!q||e.he.includes(q)||e.en.includes(q.toLowerCase())));
 return `<div class="top"><div><div class="eyebrow">${EX.length} תרגילים לציוד שלך</div><h1>תרגילים</h1></div><button class="btn primary sm" data-act="newex">+ תרגיל משלי</button></div>
 <input class="search" id="libq" type="search" placeholder="חיפוש תרגיל" value="${esc(UI.q)}" data-f="libq" aria-label="חיפוש תרגיל">
 <div class="chips"><button class="chip" data-act="lib" data-a="all" aria-pressed="${UI.lib==='all'}">הכול</button><button class="chip" data-act="lib" data-a="fav" aria-pressed="${UI.lib==='fav'}">מועדפים ★</button>${AREAS.map(a=>`<button class="chip" data-act="lib" data-a="${a.id}" aria-pressed="${UI.lib===a.id}">${a.he}</button>`).join('')}</div>
 <div class="grid">${list.map(e=>`<button class="lc" data-act="exinfo" data-ex="${e.id}">${figSVG(e.p)}<h3>${favs.includes(e.id)?'★ ':''}${esc(e.he)}</h3>${e.custom?'<span class="tag" style="color:#7cc4ff;border-color:#2a5fb0">שלי</span>':''}<div class="tags">${e.eq.map(q=>`<span class="tag">${EQ[q]}</span>`).join('')}</div></button>`).join('')||'<p class="empty">לא נמצאו תרגילים.</p>'}</div>`;}

function weekStart(d){const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()-x.getDay());return x;}
function vStats(){const ss=sorted();const ws=weekStart(new Date()).getTime();const wk=ss.filter(s=>(s.start||0)>=ws);
 const str=wk.filter(s=>s.type==='strength').length,car=wk.filter(s=>s.type==='cardio');const km=car.filter(s=>s.kind!=='spin').reduce((a,s)=>a+(+s.distKm||0),0);
 const mins=wk.reduce((a,s)=>a+(s.type==='cardio'?(+s.durMin||0):Math.round(((s.end||s.start)-s.start)/60000)),0);
 const byDay={};ss.forEach(s=>{byDay[s.date]=byDay[s.date]||{};byDay[s.date][s.type]=1;});
 const start=new Date(ws);start.setDate(start.getDate()-77);let cells='';
 for(let i=0;i<84;i++){const d=new Date(start);d.setDate(start.getDate()+i);const k=dstr(d);const b=byDay[k]||{};const fut=d>new Date();cells+=`<i class="${b.strength&&b.cardio?'b':b.strength?'s':b.cardio?'c':''} ${fut?'f':''}" title="${k}"></i>`;}
 let h=`<div class="top"><div><div class="eyebrow">השבוע מיום ראשון</div><h1>אנליטיקס</h1></div>${syncPill()}</div>
 <div class="tiles"><div class="tile"><b class="num">${str}</b><span>אימוני כוח</span></div><div class="tile"><b class="num">${car.length}</b><span>אימוני קרדיו</span></div><div class="tile"><b class="num">${km.toFixed(1)}</b><span>ק״מ ריצה והליכון</span></div><div class="tile"><b class="num">${mins}</b><span>דקות אימון</span></div></div>
 ${muscleMapCard()}
 ${recCard()}
 <section class="card"><h2>12 השבועות האחרונים</h2><div class="heat" aria-label="מפת פעילות">${cells}</div><div class="legend"><span><i style="background:var(--accent)"></i>כוח</span><span><i style="background:var(--heat)"></i>קרדיו</span><span><i style="background:linear-gradient(135deg,var(--accent) 50%,var(--heat) 50%)"></i>שניהם</span></div></section>`;
 // progress chart
 const doneEx=[...new Set(ss.filter(s=>s.type==='strength').flatMap(s=>(s.items||[]).filter(it=>(it.sets||[]).some(x=>x.done)).map(it=>it.ex)))].filter(id=>EXM[id]);
 if(!UI.ex||!doneEx.includes(UI.ex))UI.ex=doneEx[0]||'';
 h+=`<section class="card"><h2>התקדמות בתרגיל</h2>`;
 if(doneEx.length){h+=`<select id="exsel" data-f="exsel" class="search" aria-label="בחר תרגיל">${doneEx.map(id=>`<option value="${id}" ${id===UI.ex?'selected':''}>${esc(EXM[id].he)}</option>`).join('')}</select>
  <div class="seg"><button data-act="metric" data-m="vol" aria-pressed="${UI.metric==='vol'}">מגמת נפח</button><button data-act="metric" data-m="1rm" aria-pressed="${UI.metric==='1rm'}">מגמת 1RM</button></div>
  <div class="seg">${[90,28,7].map(v=>`<button data-act="range" data-v="${v}" aria-pressed="${UI.range===v}">${v}D</button>`).join('')}</div>${progChart(UI.ex,UI.metric,UI.range)}`;}
 else h+=`<p class="empty" style="margin:0">אחרי האימון הראשון יופיע כאן גרף של 1RM מוערך ונפח לכל תרגיל.</p>`;
 h+=`</section><section class="card"><div class="row between"><h2>היסטוריית אימונים</h2><div class="row"><button class="btn sm" data-act="cardio" data-k="run">+ קרדיו</button><label class="btn sm" for="garmin2">ייבוא גרמין</label><input id="garmin2" type="file" accept=".csv,text/csv" hidden></div></div>`;
 if(!ss.length)h+=`<p class="empty" style="margin:0">עוד אין אימונים שמורים. אימון שתסיים או קרדיו שתתעד יופיעו כאן.</p>`;
 ss.slice(0,60).forEach(s=>{h+=`<details class="sess"><summary><span class="stripe ${s.type==='cardio'?'c':''}"></span><div style="flex:1"><b>${s.type==='cardio'?esc(CARDIO[s.kind]?CARDIO[s.kind].he:'קרדיו'):esc((s.areas||[]).map(x=>AREA_HE[x]).join(', ')||'כוח')}</b><div class="small muted">${heDate(s.date)}${s.source==='garmin'?' · גרמין':''}</div></div><div class="small muted num" style="text-align:end">${s.type==='cardio'?`${s.distKm?(+s.distKm).toFixed(2)+' ק״מ · ':''}${s.durMin||0} דק׳`:`${doneSets(s)} סטים · ${Math.round(volOf(s)).toLocaleString('he-IL')} ק״ג`}</div></summary>`;
  if(s.type==='cardio')h+=`<table class="t"><tr><th>זמן</th><td class="num">${s.durMin||'–'} דק׳</td><th>מרחק</th><td class="num">${s.distKm?(+s.distKm).toFixed(2)+' ק״מ':'–'}</td></tr><tr><th>קצב</th><td class="num">${paceOf(+s.durMin,+s.distKm)||'–'}</td><th>דופק ממוצע</th><td class="num">${s.avgHr||'–'} ${zoneOf(+s.avgHr)}</td></tr><tr><th>דופק מרבי</th><td class="num">${s.maxHr||'–'}</td><th>קלוריות</th><td class="num">${s.kcal||'–'}</td></tr></table>${s.plan?`<div class="small muted">תוכנית: ${esc(s.plan)}</div>`:''}`;
  else h+=`<table class="t">${(s.items||[]).map(it=>{const ex=EXM[it.ex];const d=(it.sets||[]).filter(x=>x.done);return `<tr><th>${esc(ex?ex.he:it.ex)}</th><td class="num">${d.map(x=>(+x.w?fmtW(x.w)+'×':'')+x.r).join(', ')||'–'}</td></tr>`;}).join('')}</table><div class="small muted">משך ${Math.round(((s.end||s.start)-s.start)/60000)} דק׳</div>`;
  if(s.note)h+=`<div class="small">${esc(s.note)}</div>`;
  h+=`<div class="row" style="margin-top:8px"><button class="btn sm ghost danger" data-act="delsess" data-id="${s.id}">מחק</button></div></details>`;});
 return h+`</section>`;}

function recCard(){const rec=recovery();const low=Object.entries(rec).filter(([,p])=>p<95).sort((a,b)=>a[1]-b[1]);
 return `<section class="card"><div class="row between"><h2>התאוששות שרירים</h2><span class="small muted">לפי האימונים של 6 הימים האחרונים</span></div>${bodyMap(recColor(rec))}
 <div class="mlist">${low.length?low.map(([m,p])=>`<span class="mchip ${recCls(p)}">${MUS[m]} ${p}%</span>`).join(''):'<span class="mchip g">כל השרירים מוכנים לאימון</span>'}</div>
 <div class="legend"><span><i style="background:linear-gradient(135deg,#ff7a59,#d4145a)"></i>מתחת ל-50%</span><span><i style="background:linear-gradient(135deg,#ffc56b,#ff8a3d)"></i>50–80%</span><span><i style="background:linear-gradient(135deg,#6ff0b4,#1fb978)"></i>80–95%</span><span><i style="background:#24324f"></i>מוכן</span></div></section>`;}
function series(exId,metric,days){const since=Date.now()-days*864e5;return perfs(exId).filter(p=>(p.start||0)>=since).reverse().map(p=>({d:p.date,v:metric==='vol'?p.sets.reduce((a,s)=>a+(+s.w||0)*(+s.r||0),0)||p.sets.reduce((a,s)=>a+(+s.r||0),0):Math.max(...p.sets.map(s=>e1rm(+s.w||0,+s.r||0)))||Math.max(...p.sets.map(s=>+s.r||0))}));}
function progChart(exId,metric,days){const sr=series(exId,metric,days);const unit=metric==='vol'?'נפח (ק״ג)':'1RM מוערך (ק״ג)';
 if(!sr.length)return `<p class="empty" style="margin:0">אין רישומים לתרגיל הזה ב-${days} הימים האחרונים.</p>`;
 const W=320,H=150,pl=34,pr=10,pt=14,pb=24;const vs=sr.map(x=>x.v);let lo=Math.min(...vs),hi=Math.max(...vs);if(hi===lo){hi+=1;lo=Math.max(0,lo-1);}const pad2=(hi-lo)*.15;lo=Math.max(0,lo-pad2);hi+=pad2;
 const X=i=>sr.length===1?(pl+W-pr)/2:pl+i*(W-pl-pr)/(sr.length-1),Y=v=>pt+(1-(v-lo)/(hi-lo))*(H-pt-pb);
 const line=sr.map((p,i)=>`${X(i).toFixed(1)},${Y(p.v).toFixed(1)}`).join(' ');const area=`${X(0)},${H-pb} ${line} ${X(sr.length-1)},${H-pb}`;
 const last=sr[sr.length-1],first=sr[0];const diff=last.v-first.v;
 let g='';[lo,(lo+hi)/2,hi].forEach(v=>g+=`<line x1="${pl}" x2="${W-pr}" y1="${Y(v)}" y2="${Y(v)}" stroke="#22366e"/><text x="${pl-4}" y="${Y(v)+4}" text-anchor="end">${Math.round(v)}</text>`);
 return `<div class="row between"><div><div class="label">${unit}</div><div class="small muted">אחרון</div><b class="num" style="font-family:var(--display);font-size:1.5rem">${Math.round(last.v*10)/10}</b></div><span class="rec ${diff<0?'down':''}">${diff>=0?'▲':'▼'} ${Math.abs(Math.round(diff*10)/10)} ב-${days} ימים</span></div>
 <svg class="chart" viewBox="0 0 ${W} ${H}" direction="ltr">${g}<polygon points="${area}" fill="var(--accent)" opacity=".18"/><polyline points="${line}" fill="none" stroke="var(--accent2)" stroke-width="2.5" stroke-linejoin="round"/>${sr.map((p,i)=>`<circle cx="${X(i)}" cy="${Y(p.v)}" r="${i===sr.length-1?5:3}" fill="${i===sr.length-1?'var(--heat)':'var(--accent2)'}"/>`).join('')}<text x="${pl}" y="${H-6}">${heDate(first.d,{day:'numeric',month:'numeric'})}</text><text x="${W-pr}" y="${H-6}" text-anchor="end">${heDate(last.d,{day:'numeric',month:'numeric'})}</text></svg>`;}

function vPrefs(){const s=S.settings;return `<div class="top"><div><div class="eyebrow">הגדרות ונתונים</div><h1>פרופיל</h1></div>${syncPill()}</div>
 ${profileCard()}${accountCard()}<section class="card"><h2>אימון</h2><div class="form">
 <label>דופק מרבי (מהשעון)<input id="p-maxHr" inputmode="numeric" data-f="set" data-k="maxHr" value="${esc(s.maxHr)}"></label>
 <label>קפיצת משקל במשקולות יד (ק״ג)<input id="p-db" inputmode="decimal" data-f="set" data-k="dbInc" value="${esc(s.dbInc)}"></label>
 <label>קפיצת משקל במולטי טריינר (ק״ג)<input id="p-mt" inputmode="decimal" data-f="set" data-k="mtInc" value="${esc(s.mtInc)}"></label>
 <label>מטרת ברירת מחדל<select id="p-goal" data-f="set" data-k="goal">${Object.entries(GOALS).map(([k,v])=>`<option value="${k}" ${s.goal===k?'selected':''}>${v}</option>`).join('')}</select></label>
 <label class="wide">צליל וריטוט בסיום מנוחה<select id="p-sound" data-f="set" data-k="sound"><option value="1" ${s.sound?'selected':''}>פעיל</option><option value="" ${!s.sound?'selected':''}>כבוי</option></select></label></div>
 <p class="small muted" style="margin:0">אזורי הדופק בתיעוד הקרדיו מחושבים מהדופק המרבי. כדאי להעתיק אותו מפרופיל המשתמש ב-Garmin Connect.</p></section>
 <section class="card"><div class="row between"><h2>תוכנית שבועית</h2><button class="btn sm" data-act="openq">שאלון תוכנית</button></div>${s.plan.map((p,i)=>`<div class="row" style="flex-wrap:nowrap"><b style="width:28px">${DAYS[i]}</b><input class="search" id="pl-${i}" data-f="plan" data-i="${i}" value="${esc(p.l||'')}" aria-label="שם היום"><select class="search" style="width:auto" id="plk-${i}" data-f="plank" data-i="${i}" aria-label="סוג">${[['', 'כוח לפי אזורים'],['run','ריצה'],['tread','הליכון'],['spin','ספינינג'],['rest','מנוחה']].map(([k,v])=>`<option value="${k}" ${(p.cardio||(!p.areas&&!p.cardio?'rest':''))===k?'selected':''}>${v}</option>`).join('')}</select></div>
 ${!p.cardio&&p.areas?`<div class="chips" style="margin-inline-start:36px">${AREAS.map(a=>`<button class="chip" style="min-height:32px;padding:4px 10px;font-size:.82rem" data-act="planarea" data-i="${i}" data-a="${a.id}" aria-pressed="${p.areas.includes(a.id)}">${a.he}</button>`).join('')}</div>`:''}`).join('')}</section>
 <section class="card"><h2>גיבוי</h2><p class="small muted" style="margin:0">${S.sessions.length} אימונים שמורים. ${SYNC==='cloud'?'הנתונים נשמרים בחשבון שלך ומסונכרנים בין מכשירים.':'הנתונים נשמרים בדפדפן הזה בלבד. כדאי לייצא גיבוי מדי פעם.'}</p>
 <div class="row"><button class="btn" data-act="export">העתק גיבוי</button><button class="btn" data-act="import">שחזר מגיבוי</button></div>
 <div class="row"><button class="btn danger" data-act="reset">מחק את כל הנתונים</button></div></section>`;}

/* ===================== AI COACH ===================== */
let SAMPLE=null,coachCtl=null;const COACH={busy:false,status:'',chat:[]};
(async()=>{try{if(window.claude&&typeof claude.use==='function'){SAMPLE=await claude.use('sample');if(SAMPLE)render();}}catch(e){}})();
const AIERR={not_granted:'לא אישרת למאמן להשתמש ב-Claude.',sampling_disabled:'Claude לא זמין בחשבון הזה.',rate_limited:'יותר מדי בקשות כרגע. נסה שוב בעוד דקה.',session_expired:'צריך להתחבר מחדש ל-Claude.',invalid_json:'התשובה לא הגיעה בפורמט תקין. נסה שוב.',refused:'המאמן לא יכול לענות על זה.',cancelled:''};
const aiMsg=e=>AIERR[e&&e.code]!=null?AIERR[e.code]:'משהו השתבש בחיבור. נסה שוב.';
function coachContext(){const st=S.settings;const rec=recovery();
 const hist=sorted().slice(0,14).map(s=>s.type==='cardio'?`${s.date} | ${CARDIO[s.kind]?CARDIO[s.kind].he:'קרדיו'} ${s.durMin||'?'} דק׳${s.distKm?' '+s.distKm+' ק״מ':''}${s.avgHr?' דופק '+s.avgHr:''}`:`${s.date} | כוח: `+(s.items||[]).map(it=>`${EXM[it.ex]?EXM[it.ex].he:it.ex} ${(it.sets||[]).filter(x=>x.done).map(x=>(+x.w?x.w+'×':'')+x.r).join(',')}`).join('; ')).join('\n');
 return `ציוד זמין: מולטי טריינר (פולי עליון/תחתון, לחיצת חזה, פשיטת/כפיפת ברכיים), ספסל מתכוונן, משקולות יד, אופני ספינינג, הליכון, ריצה בחוץ. שעון Garmin Fenix 8 Pro.
מטרה נוכחית: ${GOALS[st.goal]}. רמה: ${{beg:'מתחיל',mid:'בינוני',adv:'מתקדם'}[st.level]||'לא צוין'}. דופק מרבי: ${st.maxHr}. קפיצות משקל: משקולות יד ${st.dbInc} ק״ג, מולטי ${st.mtInc} ק״ג.
התאוששות שרירים עכשיו (%): ${Object.entries(rec).map(([m,p])=>MUS[m]+' '+p).join(', ')}
תוכנית שבועית: ${st.plan.map((p,i)=>DAYS[i]+' '+(p.l||'')).join(' | ')}
היום: ${heDate(today())}.
אימונים אחרונים:
${hist||'אין עדיין אימונים מתועדים.'}`;}
function coachCard(){const on=!!SAMPLE;
 return `<section class="card ai"><div class="row between"><h2><span class="spark">✦</span> המאמן AI</h2>${COACH.busy?`<button class="btn sm" data-act="aistop">עצור</button>`:''}</div>
 ${on?`<p class="small muted" style="margin:0">בונה אימון לפי ההיסטוריה, ההתאוששות והציוד שלך, ועונה על שאלות אימון.</p>
 <div class="two"><button class="btn primary" data-act="aibuild" ${COACH.busy?'disabled':''}>✦ בנה לי אימון להיום</button><button class="btn" data-act="aichat">שאל את המאמן</button></div>
 ${COACH.status?`<div class="aiout small" id="aistatus">${esc(COACH.status)}</div>`:''}`:`<p class="small muted" style="margin:0">המאמן עובד כשהאפליקציה פתוחה בתוך Claude (בדפדפן או באפליקציה), ומשתמש בחשבון Claude שלך.</p>`}</section>`;}
async function aiBuild(){if(!SAMPLE||COACH.busy)return;const d=UI.draft;COACH.busy=true;COACH.status='המאמן מנתח את האימונים וההתאוששות שלך…';render();coachCtl=new AbortController();
 const lib=EX.map(e=>`${e.id} | ${e.he} | ${AREA_HE[e.a]} | ${e.type==='w'?'משקל':e.type==='bw'?'משקל גוף':'זמן בשניות'} | ${e.mu[0].map(m=>MUS[m]).join('+')}`).join('\n');
 const prompt=`אתה מאמן כושר מוסמך. בנה אימון כוח אחד להיום עבור המתאמן.
${coachContext()}

בקשה: אזורים שנבחרו: ${d.areas.length?d.areas.map(a=>AREA_HE[a]).join(', '):'לא נבחרו — בחר אתה לפי ההתאוששות והתוכנית השבועית'}. משך: ${d.dur} דקות. מטרה: ${GOALS[d.goal]}.
כללים: השתמש רק במזהים מהרשימה למטה. ${d.dur<=30?'4':d.dur<=45?'5':d.dur<=60?'6':'7'} תרגילים בערך. תרגילים מורכבים קודם. הימנע מעומס על שרירים מתחת ל-60% התאוששות. אם יש היסטוריה לתרגיל, קבע משקל בהתאם לעיקרון עומס הדרגתי; אם אין, השאר kg כ-null. לתרגילי זמן, reps הוא שניות.
רשימת תרגילים (id | שם | אזור | סוג | שרירים):
${lib}

החזר JSON בלבד, במבנה:
{"title":"שם קצר לאימון","why":"2–3 משפטים בעברית: למה האימון הזה היום","items":[{"id":"db-bench","sets":3,"reps":[8,12],"kg":20,"tip":"דגש קצר בעברית"}]}`;
 try{const j=await SAMPLE.json(prompt,{signal:coachCtl.signal,cache:false});
  const items=(j&&Array.isArray(j.items)?j.items:[]).filter(x=>x&&EXM[x.id]);if(!items.length)throw{code:'invalid_json'};
  const ov={};items.forEach(x=>{const r=Array.isArray(x.reps)&&x.reps.length===2?x.reps.map(Number):rangeFor(EXM[x.id],d.goal);ov[x.id]={sets:Math.min(6,Math.max(1,+x.sets||3)),range:r,w:+x.kg||null,tip:String(x.tip||'').slice(0,140)};});
  const ids=[...new Set(items.map(x=>x.id))];const areas=[...new Set(ids.map(id=>EXM[id].a))];
  UI.draft={areas:d.areas.length?d.areas:areas,goal:d.goal,dur:d.dur,items:ids,ai:{title:String(j.title||'אימון מהמאמן').slice(0,60),why:String(j.why||'').slice(0,500),ov}};COACH.status='';
 }catch(e){COACH.status=aiMsg(e);}
 COACH.busy=false;render();}
function chatSheet(){const sugg=['לרוץ היום או לנוח?','איך לשבור קיפאון בלחיצת חזה?','בנה לי שבוע אימונים מלא','איך לשלב ריצה עם אימוני רגליים?'];
 openSheet(`<div class="sh-top"><h1><span class="spark" style="color:#7cc4ff">✦</span> המאמן</h1><button class="pillbtn" data-act="closesheet">חזרה</button></div>
 <div class="chat" id="chat">${COACH.chat.map(m=>`<div class="msg ${m.role==='user'?'u':'a'}">${esc(m.content)}</div>`).join('')||'<p class="muted" style="margin:0">שאל כל שאלה על האימונים שלך. המאמן רואה את ההיסטוריה, ההתאוששות והציוד.</p>'}</div>
 ${COACH.chat.length?'':`<div class="chips">${sugg.map(q=>`<button class="chip" data-act="aiq" data-q="${esc(q)}">${esc(q)}</button>`).join('')}</div>`}
 <form id="chatf" class="row" style="flex-wrap:nowrap"><input class="search" id="chatin" placeholder="כתוב שאלה…" autocomplete="off" aria-label="שאלה למאמן"><button class="btn primary" type="submit" id="chatsend">שלח</button></form>
 <p class="small muted" style="margin:0">המאמן לא מחליף רופא או פיזיותרפיסט. בכאב חד או חריג, עצור והתייעץ.</p>`,'full');}
async function aiAsk(q){if(!SAMPLE||!q.trim()||COACH.busy)return;COACH.chat.push({role:'user',content:q.trim()});COACH.busy=true;chatSheet();
 const box=$('#chat');const bub=document.createElement('div');bub.className='msg a';bub.textContent='המאמן חושב…';box.appendChild(bub);bub.scrollIntoView({block:'end'});coachCtl=new AbortController();
 const RULES=`אתה מאמן כושר אישי שמדבר עברית, ענייני ותמציתי (עד 150 מילה אלא אם ביקשו תוכנית). התאם את התשובות לנתונים של המתאמן. אל תאבחן פציעות; בכאב חד או חריג המלץ לעצור ולפנות לרופא או פיזיותרפיסט. בלי Markdown כבד, אפשר רשימה ממוספרת.\n\nנתוני המתאמן:\n${coachContext()}`;
 try{const turns=COACH.chat.slice(-10);const {text}=await SAMPLE([{role:'user',content:RULES},...turns],{cache:false,signal:coachCtl.signal,onText:({text})=>{bub.textContent=text;bub.scrollIntoView({block:'end'});}});COACH.chat.push({role:'assistant',content:text});}
 catch(e){bub.textContent=(e&&e.text)||aiMsg(e)||'נעצר.';if(e&&e.text)COACH.chat.push({role:'assistant',content:e.text});}
 COACH.busy=false;const sb=$('#chatsend');if(sb)sb.disabled=false;}

function exForm(c){c=c||{};const pats=[['press','לחיצה בשכיבה'],['incline','לחיצה בשיפוע'],['fly','פרפר'],['mpress','לחיצה במכונה'],['cross','קרוס אובר'],['pushup','שכיבות סמיכה'],['pulldown','משיכה מלמעלה'],['crow','חתירה בכבל'],['dbrow','חתירה ביד אחת'],['bentrow','חתירה בהטיה'],['csrow','חתירה על ספסל משופע'],['ohp','לחיצת כתפיים'],['lateral','הרחקה לצדדים'],['front','הרמה קדמית'],['upright','חתירה אנכית'],['shrug','משיכות כתפיים'],['curl','כפיפת מרפקים'],['ccurl','כפיפה בכבל'],['pushdown','פשיטה בכבל'],['overhead','פשיטה מעל הראש'],['skull','סקל קראשר'],['kickback','קיקבק'],['dip','מקבילים'],['squat','סקוואט'],['lunge','לאנג׳'],['bulgarian','בולגרי'],['stepup','עלייה על ספסל'],['rdl','דדליפט רומני'],['bridge','גשר ישבן'],['legext','פשיטת ברכיים'],['legcurl','כפיפת ברכיים'],['calf','תאומים'],['kickglute','בעיטת ישבן'],['crunch','כפיפות בטן'],['legraise','הרמות רגליים'],['plank','פלאנק'],['twist','טוויסט'],['woodchop','חוטב עצים'],['deadbug','דד באג']];
 openSheet(`<div class="sh-top"><h1>${c.id?'עריכת תרגיל':'תרגיל חדש'}</h1><button class="pillbtn" data-act="closesheet">חזרה</button></div>
 <form id="exf" class="form" data-id="${c.id||''}">
 <label class="wide">שם התרגיל<input id="x-he" required value="${esc(c.he||'')}" placeholder="לדוגמה: לחיצת רצפה במשקולות"></label>
 ${SAMPLE?`<button type="button" class="btn wide" data-act="aifill">✦ מלא את השאר בעזרת המאמן</button><p class="wide small muted" id="x-ai" style="margin:0"></p>`:''}
 <label>אזור<select id="x-a">${AREAS.map(a=>`<option value="${a.id}" ${c.a===a.id?'selected':''}>${a.he}</option>`).join('')}</select></label>
 <label>סוג<select id="x-type"><option value="w" ${c.type==='w'?'selected':''}>משקל וחזרות</option><option value="bw" ${c.type==='bw'?'selected':''}>משקל גוף</option><option value="time" ${c.type==='time'?'selected':''}>זמן</option></select></label>
 <label>תנועה להנפשה<select id="x-p">${pats.map(([k,v])=>`<option value="${k}" ${c.p===k?'selected':''}>${v}</option>`).join('')}</select></label>
 <label>מורכב / מבודד<select id="x-k"><option value="c" ${c.k==='c'?'selected':''}>מורכב</option><option value="i" ${c.k!=='c'?'selected':''}>מבודד</option></select></label>
 <div class="wide"><div class="label">ציוד</div><div class="chips">${Object.entries(EQ).map(([k,v])=>`<button type="button" class="chip" data-act="xeq" data-k="${k}" aria-pressed="${(c.eq||['db']).includes(k)}">${v}</button>`).join('')}</div></div>
 <div class="wide"><div class="label">שרירים ראשיים</div><div class="chips">${Object.entries(MUS).map(([k,v])=>`<button type="button" class="chip" style="min-height:32px;padding:4px 10px;font-size:.82rem" data-act="xmu" data-k="${k}" aria-pressed="${((c.mu||[[]])[0]).includes(k)}">${v}</button>`).join('')}</div></div>
 <label class="wide">איך מבצעים (שורה לכל שלב)<textarea id="x-cues" rows="3">${esc((c.cues||[]).join('\n'))}</textarea></label>
 <label class="wide">טעויות נפוצות (שורה לכל טעות)<textarea id="x-err" rows="2">${esc((c.err||[]).join('\n'))}</textarea></label>
 <label class="wide">שם באנגלית לחיפוש סרטון<input id="x-en" dir="ltr" value="${esc(c.en&&c.en!==c.he?c.en:'')}"></label>
 <button class="btn primary wide" type="submit">שמור תרגיל</button>${c.id?`<button type="button" class="btn danger wide" data-act="delex" data-id="${c.id}">מחק תרגיל</button>`:''}</form>`,'full');}
function readExForm(){const f=$('#exf');const sel=a=>[...f.querySelectorAll(`[data-act="${a}"][aria-pressed="true"]`)].map(b=>b.dataset.k);const lines=id=>$(id).value.split('\n').map(x=>x.trim()).filter(Boolean);
 return{id:f.dataset.id||'my-'+uid(),he:$('#x-he').value.trim(),a:$('#x-a').value,type:$('#x-type').value,p:$('#x-p').value,k:$('#x-k').value,eq:sel('xeq'),mu:[sel('xmu'),[]],cues:lines('#x-cues'),err:lines('#x-err'),en:$('#x-en').value.trim(),mus:sel('xmu').map(m=>MUS[m]).join(', '),custom:true};}
async function aiFill(){const name=$('#x-he').value.trim();const out=$('#x-ai');if(!name){out.textContent='כתוב קודם שם לתרגיל.';return;}out.textContent='המאמן ממלא את הפרטים…';
 const prompt=`אתה מאמן כושר. המתאמן רוצה להוסיף את התרגיל "${name}". ציוד זמין: מולטי טריינר, ספסל, משקולות יד, משקל גוף.
החזר JSON בלבד: {"a":"אחד מ: ${AREAS.map(a=>a.id).join('|')}","type":"w|bw|time","k":"c|i","p":"אחד מ: ${Object.keys(PATS).filter(k=>!['run','tread','cycle'].includes(k)).join('|')} (התנועה הדומה ביותר)","eq":["mt|bench|db|bw"],"mu":["מתוך: ${Object.keys(MUS).join('|')}"],"cues":["3 שלבי ביצוע קצרים בעברית"],"err":["2 טעויות נפוצות בעברית"],"en":"English name"}`;
 try{const j=await SAMPLE.json(prompt,{modelTier:'quick'});const f=$('#exf');if(!f)return;
  if(AREA_HE[j.a])$('#x-a').value=j.a;if(['w','bw','time'].includes(j.type))$('#x-type').value=j.type;if(PATS[j.p])$('#x-p').value=j.p;if(j.k==='c'||j.k==='i')$('#x-k').value=j.k;
  f.querySelectorAll('[data-act="xeq"]').forEach(b=>b.setAttribute('aria-pressed',String((j.eq||[]).includes(b.dataset.k))));f.querySelectorAll('[data-act="xmu"]').forEach(b=>b.setAttribute('aria-pressed',String((j.mu||[]).includes(b.dataset.k))));
  if(Array.isArray(j.cues))$('#x-cues').value=j.cues.join('\n');if(Array.isArray(j.err))$('#x-err').value=j.err.join('\n');if(j.en)$('#x-en').value=j.en;out.textContent='מולא. בדוק ושמור.';}
 catch(e){out.textContent=aiMsg(e);}}

/* ===================== PLAN QUESTIONNAIRE ===================== */
const Q={open:false,step:0,a:null};
const QFOCUS=[['chest','חזה',['chest'],'f'],['shoulders','כתפיים',['delts_f','delts_s'],'f'],['arms','ידיים',['biceps','forearms'],'f'],['core','בטן',['abs','obliques'],'f'],['back','גב',['lats','midback','traps'],'b'],['legs','רגליים',['quads','hams','glutes'],'f']];
function miniBody(mus,side,L,P){const vb=mus.includes('quads')?'52 250 96 170':mus.includes('abs')?'60 136 80 110':mus.includes('biceps')||mus.includes('triceps')?'24 96 152 110':mus.includes('lats')?'48 60 104 180':mus.includes('delts_f')?'30 72 140 70':'56 76 88 72';const col=L?(m=>mus.includes(m)?(LV_FILL[mmLevel(L.M[m],P)]||null):null):(m=>mus.includes(m)?'url(#lvH)':null);return bodySVG(side==='b'?'back':'front',col,true,{vb});}
function qDefaults(){const p=S.settings.q;return p?JSON.parse(JSON.stringify(p)):{level:'mid',cardio:3,ckinds:['run','tread','spin'],goal:S.settings.goal==='endure'?'cut':'build',days:3,dur:+S.settings.dur>=60?60:+S.settings.dur<=30?30:45,focus:['chest','back','shoulders'],split:'auto'};}
function openQ(){Q.open=true;Q.step=0;Q.a=qDefaults();renderQ();}
function closeQ(){Q.open=false;$('#qz').innerHTML='';}
const QDAYS={1:[0],2:[0,3],3:[0,2,4],4:[0,1,3,4],5:[0,1,2,4,5],6:[0,1,2,3,4,5]};
function buildPlan(a){const n=a.days;let split=a.split;if(split==='auto')split=n<=2?'full':n===3?'ppl':n===4?'ul':'ppl';
 const T={push:{l:'Push · חזה, כתפיים, יד אחורית',areas:['chest','shoulders','triceps']},pull:{l:'Pull · גב, יד קדמית',areas:['back','biceps']},legs:{l:'רגליים ובטן',areas:['legs','core']},upper:{l:'פלג גוף עליון',areas:['chest','back','shoulders','biceps','triceps']},lower:{l:'פלג גוף תחתון ובטן',areas:['legs','core']},full:{l:'כל הגוף',areas:['chest','back','legs','shoulders','core']}};
 const seq=split==='full'?['full']:split==='ul'?['upper','lower']:split==='pp'?['push','pull']:['push','pull','legs'];
 const plan=Array.from({length:7},()=>({l:'מנוחה'}));const idx=QDAYS[n]||QDAYS[3];
 idx.forEach((d,k)=>{const t=T[seq[k%seq.length]];plan[d]={l:t.l,areas:[...t.areas]};});
 // focus: make sure each focus area appears; add to the lightest strength day
 const fmap={chest:['chest'],shoulders:['shoulders'],arms:['biceps','triceps'],core:['core'],back:['back'],legs:['legs']};
 a.focus.forEach(f=>fmap[f].forEach(ar=>{const days=idx.map(d=>plan[d]);const cnt=days.filter(p=>p.areas.includes(ar)).length;const want=n>=4?2:1;if(cnt<want){const tgt=days.filter(p=>!p.areas.includes(ar)).sort((x,y)=>x.areas.length-y.areas.length)[0];if(tgt){tgt.areas.push(ar);tgt.l+=' + '+AREA_HE[ar];}}}));
 // cardio on free days
 const free=[0,1,2,3,4,5,6].filter(d=>!idx.includes(d));const ck=a.ckinds.length?a.ckinds:['run'];const ncard=Math.min(a.cardio,free.length);
 const pick=ncard>=free.length?free:free.filter((_,i)=>i%Math.max(1,Math.round(free.length/ncard))===0).slice(0,ncard);
 while(pick.length<ncard){const r=free.find(d=>!pick.includes(d));if(r==null)break;pick.push(r);}
 pick.sort((x,y)=>x-y).forEach((d,k)=>{const kind=ck[k%ck.length];plan[d]={l:(a.goal==='cut'&&kind!=='run'?'אינטרוולים · ':'')+CARDIO[kind].he,cardio:kind};});
 return plan;}
function qBtn(act,val,label,on,extra){return `<button class="qb ${extra||''}" data-act="${act}" data-v="${val}" aria-pressed="${!!on}">${label}</button>`;}
function renderQ(){if(!Q.open)return;const a=Q.a,st=Q.step;const dots=`<div class="qdots">${[0,1,2].map(i=>`<i class="${i===st?'on':''}"></i>`).join('')}</div>`;
 const head=`<div class="notch"></div><div class="qtitle"><span>חדר הכושר שלי</span><svg viewBox="0 0 34 20"><rect x="0" y="6" width="4" height="8" rx="1.5" fill="#9fb2c4"/><rect x="5" y="2" width="5" height="16" rx="2" fill="#1f6bff"/><rect x="10" y="8.5" width="14" height="3" rx="1.5" fill="#7aa2ff"/><rect x="24" y="2" width="5" height="16" rx="2" fill="#1f6bff"/><rect x="30" y="6" width="4" height="8" rx="1.5" fill="#9fb2c4"/></svg></div><div class="qsub">תוכנית האימון המותאמת שלך</div>`;
 let body='';
 if(st===0){body=`<div class="qh">רמה</div><div class="qrow c3">${[['beg','מתחיל'],['mid','בינוני'],['adv','מתקדם']].map(([k,v])=>qBtn('qlevel',k,v,a.level===k)).join('')}</div>
  <div class="qh">אימוני קרדיו בשבוע</div><div class="qrow c5">${[0,1,2,3,4].map(v=>qBtn('qcardio',v,v,a.cardio===v)).join('')}</div>
  <div class="qh">סוג קרדיו</div><div class="qrow c3">${[['run','ריצה בחוץ'],['tread','הליכון'],['spin','ספינינג']].map(([k,v])=>qBtn('qck',k,v,a.ckinds.includes(k))).join('')}</div>
  <p class="qnote">הציוד שלך: מולטי טריינר, ספסל, משקולות יד, ספינינג והליכון. שעון Garmin לניטור.</p>`;}
 else if(st===1){body=`<div class="qh">מטרה</div><div class="qrow c3">${[['build','בניית שריר'],['cut','חיטוב'],['both','גם וגם']].map(([k,v])=>qBtn('qgoal',k,v,a.goal===k)).join('')}</div>
  <div class="qh">אימונים בשבוע</div><div class="qrow c6">${[1,2,3,4,5,6].map(v=>qBtn('qdays',v,v,a.days===v)).join('')}</div>
  <div class="qh">משך אימון</div><div class="qrow c3">${[[30,'30 דק׳'],[45,'45 דק׳'],[60,'+60 דק׳']].map(([k,v])=>qBtn('qdur',k,v,a.dur===k)).join('')}</div>
  <div class="qh">מיקוד</div><div class="qrow mus3">${QFOCUS.map(([k,v,mus,side])=>`<button class="qb mus" data-act="qfocus" data-v="${k}" aria-pressed="${a.focus.includes(k)}"><span>${v}</span><span class="mi">${miniBody(mus,side)}</span></button>`).join('')}</div>
  <div class="qh">פיצול אימונים</div><div class="qrow c1">${qBtn('qsplit','pp','Push/Pull',a.split==='pp')}${qBtn('qsplit','ul','Upper/Lower',a.split==='ul')}${qBtn('qsplit','auto','תן לאפליקציה להחליט',a.split==='auto')}</div>`;}
 else{const plan=buildPlan(a);body=`<div class="qh">התוכנית השבועית שלך</div><div class="qrow c1">${plan.map((p,i)=>`<div class="qday ${p.cardio?'c':!p.areas?'r':''}"><b>${DAYS[i]}</b><span>${esc(p.l)}</span></div>`).join('')}</div>
  <p class="qnote">${a.days} אימוני כוח של ${a.dur===60?'60+':a.dur} דק׳ · ${plan.filter(p=>p.cardio).length} אימוני קרדיו${plan.filter(p=>p.cardio).length<a.cardio?` (ביקשת ${a.cardio}, אין מספיק ימים פנויים)`:''} · מטרה: ${{build:'בניית שריר',cut:'חיטוב',both:'גם וגם'}[a.goal]}</p>`;}
 const cta=st===0?`<button class="qcta" data-act="qnext">התחל את השאלון</button>`:st===1?`<div class="qnav"><button class="qb" data-act="qback">חזרה</button><button class="qb" aria-pressed="true" data-act="qnext">צור תוכנית</button></div>`:`<div class="qnav"><button class="qb" data-act="qback">חזרה</button><button class="qb" aria-pressed="true" data-act="qsave">שמור והתחל</button></div>`;
 $('#qz').innerHTML=`<div class="qwrap" role="dialog" aria-modal="true" aria-label="שאלון תוכנית אימון"><div class="qpanel">${head}${body}${dots}</div>${cta}<button class="qb" style="background:transparent;border-color:transparent;min-height:36px;color:#9fb0bf" data-act="qclose">סגור בלי לשמור</button></div>`;}
function qAct(A,v){const a=Q.a;const tg=(arr,x)=>arr.includes(x)?arr.filter(y=>y!==x):[...arr,x];
 if(A==='qlevel')a.level=v;else if(A==='qcardio')a.cardio=+v;else if(A==='qck')a.ckinds=tg(a.ckinds,v);else if(A==='qgoal')a.goal=v;else if(A==='qdays')a.days=+v;else if(A==='qdur')a.dur=+v;else if(A==='qfocus')a.focus=tg(a.focus,v);else if(A==='qsplit')a.split=v;
 else if(A==='qnext')Q.step=Math.min(2,Q.step+1);else if(A==='qback')Q.step=Math.max(0,Q.step-1);else if(A==='qclose'){closeQ();return;}
 else if(A==='qsave'){S.settings.plan=buildPlan(a);S.settings.goal=a.goal==='cut'?'endure':'hyper';S.settings.dur=a.dur===60?60:a.dur;S.settings.level=a.level;S.settings.q=JSON.parse(JSON.stringify(a));saveSettings();UI.draft=null;UI.selDay=null;closeQ();go('today');toast('התוכנית נשמרה');return;}
 const y=$('.qwrap')?$('.qwrap').scrollTop:0;renderQ();if(Q.step===Number(Q.step)&&A!=='qnext'&&A!=='qback'){$('.qwrap').scrollTop=y;}else $('.qwrap').scrollTop=0;}

/* ===================== IN-APP VIDEO ===================== */
// First YouTube search result for "<exercise> proper form"
const VID={'db-bench':'5Y3VZsLb1Ys','mt-pulldown':'EfvPfLOuC3Y'};
const CAN_EMBED=!window.claude; // Claude's viewer blocks third-party iframes; the website allows them
function ytId(u){if(!u)return null;const m=String(u).match(/(?:youtu\.be\/|v=|\/shorts\/|\/embed\/)([A-Za-z0-9_-]{11})/);return m?m[1]:null;}
function videoOf(id){const own=ytId(S.settings.videos[id]);return own||VID[id]||null;}
const ytSearch=ex=>'https://www.youtube.com/results?search_query='+encodeURIComponent(ex.en+' proper form');
function videoBtn(ex,cls){const v=videoOf(ex.id);if(v&&CAN_EMBED)return `<button class="btn ${cls||'sm'} primary" data-act="video" data-ex="${ex.id}">▶ סרטון הדגמה</button>`;
 return `<a class="btn ${cls||'sm'}${v?' primary':''}" href="${v?'https://www.youtube.com/watch?v='+v:ytSearch(ex)}" target="_blank" rel="noopener">▶ ${v?'סרטון הדגמה':'חיפוש סרטון ביוטיוב'}</a>`;}
function openVideo(id){const ex=EXM[id];const v=videoOf(id);if(!v)return;
 openSheet(`<div class="sh-top"><h1 style="font-size:1.5rem">${esc(ex.he)}</h1><button class="pillbtn" data-act="closesheet">סגור</button></div>
 <div class="vwrap"><iframe src="https://www.youtube-nocookie.com/embed/${v}?autoplay=1&playsinline=1&rel=0&modestbranding=1" title="סרטון הדגמה: ${esc(ex.he)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
 <div class="row"><a class="btn sm" href="https://www.youtube.com/watch?v=${v}" target="_blank" rel="noopener">פתח ביוטיוב</a><a class="btn sm ghost" href="${ytSearch(ex)}" target="_blank" rel="noopener">סרטונים נוספים</a></div>
 <section class="card"><div class="label">איך לבצע נכון</div><ol style="margin:0;padding-inline-start:20px">${ex.cues.map(c=>`<li>${esc(c)}</li>`).join('')}</ol></section>
 <p class="small muted" style="margin:0">${S.settings.videos[id]?'הסרטון שבחרת לתרגיל הזה.':'הסרטון הראשון בחיפוש ביוטיוב. אפשר להחליף אותו בקישור משלך במסך התרגיל.'}</p>`,'full');}

/* ===================== SHEETS ===================== */
function openSheet(html,cls){$('#sheet').innerHTML=`<div class="sheet" data-act="closesheet"><div class="panel ${cls||''}" role="dialog" aria-modal="true" data-stop="1">${html}</div></div>`;registerFigs($('#sheet'));const f=$('#sheet input,#sheet button');}
function closeSheet(){$('#sheet').innerHTML='';UI.sheetEx=null;}
function dialog(title,body,actions){openSheet(`<h2>${esc(title)}</h2><p class="muted" style="margin:0">${body}</p><div class="row">${actions}<button class="btn ghost" data-act="closesheet">ביטול</button></div>`);}
function exInfo(id){UI.sheetEx=id;const ex=EXM[id];const ps=perfs(id).slice(0,6);const vid=S.settings.videos[id]||'';const fav=(S.settings.favs||[]).includes(id);const best=Math.max(0,...perfs(id).flatMap(p=>p.sets.map(s=>e1rm(+s.w||0,+s.r||0))));
 const keep=$('#sheet .panel');const sc=keep?keep.scrollTop:0;
 openSheet(`<div class="sh-top"><h1>${esc(ex.he)}</h1><button class="pillbtn" data-act="closesheet">חזרה</button></div>
 ${ex.custom?`<button class="btn sm ghost" data-act="editex" data-id="${id}">ערוך תרגיל משלי</button>`:''}<div class="two"><button class="btn ${fav?'on':''}" data-act="fav" data-ex="${id}" aria-pressed="${fav}">${fav?'במועדפים ★':'שמור במועדפים ☆'}</button><button class="btn" data-act="share" data-ex="${id}">שיתוף</button></div>
 <div class="media">${figSVG(ex.p,'',true)}<div class="cap"><span>מבט תרגיל</span><b>${esc(ex.he)}</b></div>${videoOf(ex.id)&&CAN_EMBED?`<button class="playov" data-act="video" data-ex="${ex.id}" aria-label="נגן סרטון הדגמה">▶</button>`:''}</div>
 <div class="figctl"><div><div class="phase" id="figphase">&nbsp;</div><div class="small muted num" id="figrep">חזרה 1</div></div><button class="btn sm" data-act="figplay" id="figplay">השהה</button><button class="btn sm" data-act="figspeed" id="figspeed">מהירות 1×</button><div class="ibar" aria-hidden="true"><i id="figbar"></i></div></div>
 <section class="card"><div class="label">שרירים פעילים</div>${bodyMap(targetColor(ex.mu[0],ex.mu[1]))}<div class="mlist">${ex.mu[0].map(m=>`<span class="mchip r">${MUS[m]}</span>`).join('')}${ex.mu[1].map(m=>`<span class="mchip a">${MUS[m]} (משני)</span>`).join('')}</div></section>
 <section class="card"><div class="label">איך לבצע נכון</div><p class="lead">${ex.cues.map(esc).join('. ')}.</p><div class="warn small">טעויות נפוצות: ${ex.err.map(esc).join(' · ')}</div>
  <div class="tags"><span class="tag">${AREA_HE[ex.a]}</span>${ex.eq.map(q=>`<span class="tag">${EQ[q]}</span>`).join('')}<span class="tag">${esc(ex.mus)}</span></div>
  <div class="row">${videoBtn(ex)}${videoOf(ex.id)?`<a class="btn sm ghost" href="${ytSearch(ex)}" target="_blank" rel="noopener">סרטונים נוספים</a>`:''}</div>
  <p class="small muted" style="margin:0">כתום = השריר שעובד. קו מקווקו = מסלול התנועה.</p></section>
 <section class="card"><div class="seg"><button data-act="xmetric" data-m="vol" aria-pressed="${UI.metric==='vol'}">מגמת נפח</button><button data-act="xmetric" data-m="1rm" aria-pressed="${UI.metric==='1rm'}">מגמת 1RM</button></div>
  <div class="seg">${[90,28,7].map(v=>`<button data-act="xrange" data-v="${v}" aria-pressed="${UI.range===v}">${v}D</button>`).join('')}</div>
  ${perfs(id).length?progChart(id,UI.metric,UI.range):'<p class="empty" style="margin:0">אחרי שתתעד את התרגיל יופיע כאן הגרף.</p>'}</section>
 <section class="card"><h2>ביצועים אחרונים ${best?`<span class="small muted">· שיא 1RM מוערך ${Math.round(best)} ק״ג</span>`:''}</h2>${ps.length?`<table class="t">${ps.map(p=>`<tr><th>${heDate(p.date,{day:'numeric',month:'short'})}</th><td class="num">${p.sets.map(s=>(+s.w?fmtW(s.w)+'×':'')+s.r).join(', ')}</td></tr>`).join('')}</table>`:'<p class="muted" style="margin:0">עוד לא תיעדת את התרגיל הזה.</p>'}
  <label class="label" for="vid-${id}">קישור לסרטון מועדף (YouTube / Instagram)</label><input class="search" id="vid-${id}" dir="ltr" data-f="vid" data-ex="${id}" value="${esc(vid)}" placeholder="https://"></section>
 ${S.active?`<button class="btn primary block" data-act="addthis" data-ex="${id}">הוסף לאימון הפתוח</button>`:''}`,'full');
 if(sc)$('#sheet .panel').scrollTop=sc;}
function pickEx(mode,i){const cur=mode==='swap'?EXM[S.active.items[i].ex]:mode==='swapdraft'?EXM[UI.draft.items[i]]:null;const used=new Set(mode.startsWith('swapd')?UI.draft.items:(S.active?S.active.items.map(x=>x.ex):[]));
 const list=EX.filter(e=>!used.has(e.id)&&(!cur||e.a===cur.a));const groups=cur?[cur.a]:AREAS.map(a=>a.id);
 openSheet(`<div class="row between"><h2>${cur?'החלף את '+esc(cur.he):'הוסף תרגיל'}</h2><button class="btn sm ghost" data-act="closesheet">סגור</button></div>${groups.map(g=>{const l=list.filter(e=>e.a===g);return l.length?`<div class="label">${AREA_HE[g]}</div><div class="plan">${l.map(e=>`<button class="pi" style="text-align:start" data-act="pick" data-mode="${mode}" data-i="${i}" data-ex="${e.id}">${figSVG(e.p)}<div><h3>${esc(e.he)}</h3><div class="meta">${e.eq.map(q=>EQ[q]).join(' · ')}</div></div><span></span></button>`).join('')}</div>`:'';}).join('')||'<p class="empty">אין תרגילים נוספים לאזור הזה.</p>'}`);}
function cardioSheet(kind){const c=CARDIO[kind];openSheet(`<div class="sh-top"><h1>תיעוד ${c.he}</h1><button class="pillbtn" data-act="closesheet">חזרה</button></div>
 <div class="seg">${Object.entries(CARDIO).map(([k,v])=>`<button data-act="cardio" data-k="${k}" aria-pressed="${k===kind}">${v.he}</button>`).join('')}</div>${figSVG(c.p)}
 <form id="cform" class="form" data-kind="${kind}"><label class="wide">תוכנית<select id="c-plan">${c.plans.map(p=>`<option value="${p.id}">${p.he}</option>`).join('')}<option value="">ללא תוכנית</option></select></label>
 <p class="wide small muted" id="c-desc" style="margin:0">${esc(c.plans[0].d)}</p>
 <label>תאריך<input id="c-date" type="date" value="${today()}"></label><label>משך (דקות)<input id="c-dur" inputmode="decimal" value="${c.plans[0].dur}"></label>
 <label>מרחק (ק״מ)<input id="c-dist" inputmode="decimal" placeholder="${kind==='spin'?'לא חובה':''}"></label><label>קלוריות<input id="c-kcal" inputmode="numeric"></label>
 <label>דופק ממוצע<input id="c-avg" inputmode="numeric"></label><label>דופק מרבי<input id="c-max" inputmode="numeric"></label>
 <label class="wide">מאמץ מורגש (1–10)<input id="c-rpe" type="range" min="1" max="10" value="6"></label>
 <label class="wide">הערות<textarea id="c-note" rows="2"></textarea></label><p class="wide small muted num" id="c-calc" style="margin:0"></p>
 <button class="btn primary wide" type="submit">שמור אימון</button></form>
 <p class="small muted" style="margin:0">הנתונים מופיעים בסיכום הפעילות בשעון ה-Fenix ובאפליקציית Garmin Connect. אפשר גם לייבא קובץ CSV ממסך היום.</p>`,'full');calcCardio();}
function calcCardio(){const f=$('#cform');if(!f)return;const dur=+$('#c-dur').value,dist=+String($('#c-dist').value).replace(',','.'),avg=+$('#c-avg').value;const out=[];const p=paceOf(dur,dist);if(p)out.push('קצב '+p);if(dist&&dur)out.push('מהירות '+(dist/(dur/60)).toFixed(1)+' קמ״ש');if(avg)out.push(zoneOf(avg)+' ('+Math.round(avg/(+S.settings.maxHr||180)*100)+'% מהמרבי)');$('#c-calc').textContent=out.join(' · ');}

/* ===================== REST TIMER ===================== */
function startRest(sec){UI.rest={end:Date.now()+sec*1000,total:sec};try{if(!UI.audio)UI.audio=new (window.AudioContext||window.webkitAudioContext)();UI.audio.resume&&UI.audio.resume();}catch(e){}renderRest();}
function renderRest(){const r=UI.rest;const el=$('#rest');if(!r||route()!=='workout'){el.innerHTML='';return;}const left=(r.end-Date.now())/1000;
 el.innerHTML=`<div class="restbar"><div class="in" role="timer"><span class="small" style="font-weight:700">מנוחה</span><b class="num" id="restt">${mmss(left)}</b><div class="bar"><i id="restp" style="width:${Math.max(0,left/r.total*100)}%"></i></div><button class="btn" data-act="rest+">+15</button><button class="btn" data-act="restx">דלג</button></div></div>`;}
function beep(){if(!S.settings.sound)return;try{navigator.vibrate&&navigator.vibrate([200,100,200]);}catch(e){}try{const a=UI.audio;if(!a)return;[0,0.25].forEach(d=>{const o=a.createOscillator(),g=a.createGain();o.frequency.value=880;g.gain.value=0.15;o.connect(g);g.connect(a.destination);o.start(a.currentTime+d);o.stop(a.currentTime+d+0.15);});}catch(e){}}
setInterval(()=>{const el=$('#elapsed');if(el&&S.active)el.textContent=mmss((Date.now()-S.active.start)/1000);const r=UI.rest;if(r){const left=(r.end-Date.now())/1000;if(left<=0){UI.rest=null;beep();renderRest();toast('המנוחה הסתיימה, לסט הבא');}else{const t=$('#restt'),p=$('#restp');if(t)t.textContent=mmss(left);if(p)p.style.width=(left/r.total*100)+'%';}}},500);

/* ===================== GARMIN CSV ===================== */
function parseCSV(text){const rows=[];let row=[],f='',q=false;for(let i=0;i<text.length;i++){const c=text[i];if(q){if(c==='"'){if(text[i+1]==='"'){f+='"';i++;}else q=false;}else f+=c;}else if(c==='"')q=true;else if(c===','){row.push(f);f='';}else if(c==='\n'){row.push(f);rows.push(row);row=[];f='';}else if(c!=='\r')f+=c;}if(f||row.length){row.push(f);rows.push(row);}return rows;}
const tmin=s=>{if(!s)return 0;const p=String(s).trim().split(':').map(Number);if(p.some(isNaN))return 0;const sec=p.length===3?p[0]*3600+p[1]*60+p[2]:p.length===2?p[0]*60+p[1]:p[0]*60;return Math.round(sec/60*10)/10;};
const numv=s=>{s=String(s||'').trim();if(!s||s==='--')return 0;if(s.includes(',')&&s.includes('.'))s=s.replace(/,/g,'');else s=s.replace(',','.');return parseFloat(s)||0;};
function importGarmin(text){const rows=parseCSV(text.replace(/^﻿/,''));if(rows.length<2){toast('הקובץ ריק או לא בפורמט של Garmin');return;}
 const hd=rows[0].map(x=>x.trim().toLowerCase());const col=(...ns)=>hd.findIndex(h=>ns.some(n=>h===n||h.includes(n)));
 const ci={type:col('activity type','סוג פעילות','סוג'),date:col('date','תאריך'),dist:col('distance','מרחק'),kcal:col('calories','קלוריות'),time:hd.findIndex(h=>h==='time'||h==='זמן'),avg:col('avg hr','דופק ממוצע'),max:col('max hr','דופק מרבי','דופק מקסימלי'),title:col('title','כותרת')};
 if(ci.type<0||ci.date<0){toast('לא נמצאו עמודות "Activity Type" ו-"Date" בקובץ');return;}
 const keys=new Set(S.sessions.filter(s=>s.type==='cardio').map(s=>s.date+'|'+s.kind+'|'+Math.round(s.durMin||0)));let n=0,skip=0;
 rows.slice(1).forEach(r=>{if(!r[ci.type])return;const t=r[ci.type].toLowerCase();const kind=/treadmill|הליכון/.test(t)?'tread':/cycl|spin|bike|biking|רכיב|אופנ/.test(t)?'spin':/run|ריצ/.test(t)?'run':null;if(!kind){skip++;return;}
  const ds=String(r[ci.date]).trim();const dt=new Date(ds.replace(' ','T'));if(isNaN(dt)){skip++;return;}
  const s={id:uid(),type:'cardio',kind,source:'garmin',date:dstr(dt),start:dt.getTime(),durMin:tmin(ci.time>=0?r[ci.time]:''),distKm:numv(r[ci.dist]),kcal:numv(r[ci.kcal])||'',avgHr:numv(r[ci.avg])||'',maxHr:numv(r[ci.max])||'',plan:ci.title>=0?r[ci.title]:''};
  const k=s.date+'|'+kind+'|'+Math.round(s.durMin);if(keys.has(k)){skip++;return;}keys.add(k);S.sessions.push(s);saveSession(s);n++;});
 toast(n?`יובאו ${n} פעילויות${skip?`, ${skip} דולגו`:''}`:'לא נמצאו פעילויות חדשות של ריצה, הליכון או רכיבה');render();}

/* ===================== EVENTS ===================== */
document.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(!t)return;
 if(t.dataset.act==='closesheet'&&e.target.closest('[data-stop]')&&!e.target.closest('button[data-act="closesheet"]'))return;
 const A=t.dataset.act,i=+t.dataset.i,d=UI.draft,a=S.active;
 switch(A){
 case 'nav':go(t.dataset.to);break;
 case 'day':{UI.selDay=i;const p=S.settings.plan[i];UI.draft=genDraft(p.areas||(p.cardio?[]:d.areas),d.goal,d.dur);render();break;}
 case 'area':{const x=t.dataset.a;const ar=d.areas.includes(x)?d.areas.filter(y=>y!==x):[...d.areas,x];UI.draft=genDraft(ar,d.goal,d.dur);render();break;}
 case 'goal':d.goal=t.dataset.g;render();break;
 case 'dur':UI.draft=genDraft(d.areas,d.goal,+t.dataset.v);render();break;
 case 'reshuffle':UI.draft=genDraft(d.areas,d.goal,d.dur,uid());render();break;
 case 'swapdraft':pickEx('swapdraft',i);break;
 case 'start':if(S.active||!d.items.length)return;S.active={id:uid(),type:'strength',date:today(),start:Date.now(),areas:[...d.areas],goal:d.goal,items:d.items.map((id,k)=>{const it=makeItem(id,d.goal,d.ai&&d.ai.ov[id]);const tc=techFor(id,k,d.items.length,d.goal);if(tc)it.tech=tc;return it;}),note:''};saveActive(true);go('workout');break;
 case 'done':{const it=a.items[i],s=it.sets[+t.dataset.s];if(!s.done){const ex=EXM[it.ex];if(s.r===''||s.r==null)s.r=s.tr||it.range[1];if((s.w===''||s.w==null)&&s.tw)s.w=s.tw;s.done=true;startRest(it.rest);}else s.done=false;saveActive();render();break;}
 case 'addset':{const it=a.items[i];const l=it.sets[it.sets.length-1]||{};it.sets.push({tw:l.tw,tr:l.tr||it.range[1],w:l.w==null?'':l.w,r:'',done:false});saveActive();render();break;}
 case 'rmset':{const it=a.items[i];if(it.sets.length>1){it.sets.pop();saveActive();render();}break;}
 case 'adj':{const it=a.items[i];const ex=EXM[it.ex];const dir=+t.dataset.d;const inc=incOf(ex);it.sets.forEach(s=>{if(s.done)return;if(ex.type==='w'&&inc&&(+s.w||+s.tw)){const nw=Math.max(0,(+s.w||+s.tw)+dir*inc);s.w=nw;s.tw=nw;}else{s.tr=Math.max(1,(+s.tr||it.range[1])+dir*(ex.type==='time'?10:2));}});toast(dir>0?'הסטים הבאים הוכבדו':'הסטים הבאים הוקלו');saveActive();render();break;}
 case 'swap':pickEx('swap',i);break;
 case 'addex':pickEx('add',-1);break;
 case 'rmex':a.items.splice(i,1);saveActive();render();break;
 case 'pick':{const id=t.dataset.ex,mode=t.dataset.mode;if(mode==='swapdraft')d.items[i]=id;else if(mode==='swap')a.items[i]=makeItem(id,a.goal);else a.items.push(makeItem(id,a.goal));if(mode!=='swapdraft')saveActive();closeSheet();render();break;}
 case 'addthis':if(a){a.items.push(makeItem(t.dataset.ex,a.goal));saveActive();closeSheet();go('workout');}break;
 case 'finish':{if(!doneSets(a)){dialog('אין סטים מסומנים','סמן לפחות סט אחד כדי לשמור את האימון, או בטל אותו.','<button class="btn danger" data-act="discardok">בטל אימון</button>');break;}
  a.end=Date.now();a.items.forEach(it=>it.sets=it.sets.filter(s=>s.done||s.r!==''));const s=JSON.parse(JSON.stringify(a));S.sessions.push(s);saveSession(s);const v=Math.round(volOf(s));S.active=null;UI.rest=null;saveActive(true);UI.draft=null;
  go('stats');toast(`האימון נשמר: ${doneSets(s)} סטים, ${v.toLocaleString('he-IL')} ק״ג נפח`);break;}
 case 'discard':dialog('לבטל את האימון?','הסטים שתיעדת באימון הזה יימחקו.','<button class="btn danger" data-act="discardok">כן, בטל</button>');break;
 case 'discardok':S.active=null;UI.rest=null;saveActive(true);closeSheet();go('today');break;
 case 'rest+':if(UI.rest){UI.rest.end+=15000;UI.rest.total+=15;}break;
 case 'restx':UI.rest=null;renderRest();break;
 case 'exinfo':exInfo(t.dataset.ex);break;
 case 'openq':openQ();break;
 case 'ppick':{const p=PROFILES.find(x=>x.id===t.dataset.v);if(p.pin)pinPrompt(p);else switchProfile(p.id);break;}
 case 'pnew':profileForm(null);break;
 case 'pback':pickProfile();break;
 case 'pswitch':saveLocal();pickProfile();break;
 case 'pedit':profileForm(CURP);break;
 case 'pcol':t.parentElement.querySelectorAll('[data-act="pcol"]').forEach(b=>b.setAttribute('aria-pressed',String(b===t)));break;
 case 'pdel':dialog('למחוק את המשתמש?','כל האימונים, ההגדרות והתוכנית של המשתמש הזה יימחקו מהמכשיר לצמיתות.',`<button class="btn danger" data-act="pdelok" data-v="${t.dataset.v}">מחק</button>`);break;
 case 'pdelok':{const id=t.dataset.v;const p=PROFILES.find(x=>x.id===id);try{localStorage.removeItem(p.key);}catch(e){}PROFILES=PROFILES.filter(x=>x.id!==id);lsSet(PROF_KEY,PROFILES);CURP=null;switchProfile(PROFILES[0].id,true);pickProfile();break;}
 case 'authopen':openAuth(t.dataset.v);break;
 case 'authmode':openAuth(t.dataset.v);break;
 case 'authguest':try{localStorage.setItem('gym.guest','1');}catch(e){}closeSheet();break;
 case 'signout':dialog('להתנתק?','האימונים נשארים שמורים בחשבון. במכשיר הזה הנתונים יימחקו עד ההתחברות הבאה.','<button class="btn danger" data-act="signoutok">התנתק</button>');break;
 case 'signoutok':(async()=>{await api('/auth/logout',{method:'POST'}).catch(()=>{});SBUSER=null;S={settings:JSON.parse(JSON.stringify(DEF)),sessions:[],active:null};saveLocal();syncCustom();UI.draft=null;closeSheet();setSync('local');render();toast('התנתקת');})();break;
 case 'video':openVideo(t.dataset.ex);break;
 case 'mm':{UI.mm=UI.mm||{period:'last'};const m=t.dataset.m;UI.mm.sel=UI.mm.sel===m?null:m;renderMM();break;}
 case 'mmgrp':{UI.mm=UI.mm||{period:'last'};const g='g:'+t.dataset.v;UI.mm.sel=UI.mm.sel===g?null:g;renderMM();break;}
 case 'mmper':UI.mm=UI.mm||{};UI.mm.period=t.dataset.v;renderMM();break;
 case 'qlevel':case 'qcardio':case 'qck':case 'qgoal':case 'qdays':case 'qdur':case 'qfocus':case 'qsplit':case 'qnext':case 'qback':case 'qclose':case 'qsave':qAct(A,t.dataset.v);break;
 case 'newex':exForm();break;
 case 'editex':exForm((S.settings.custom||[]).find(c=>c.id===t.dataset.id));break;
 case 'xeq':case 'xmu':t.setAttribute('aria-pressed',String(t.getAttribute('aria-pressed')!=='true'));break;
 case 'aifill':aiFill();break;
 case 'delex':{S.settings.custom=(S.settings.custom||[]).filter(c=>c.id!==t.dataset.id);saveSettings();syncCustom();closeSheet();toast('התרגיל נמחק');render();break;}
 case 'aibuild':aiBuild();break;
 case 'aistop':coachCtl&&coachCtl.abort();break;
 case 'aichat':chatSheet();break;
 case 'aiq':aiAsk(t.dataset.q);break;
 case 'xmetric':UI.metric=t.dataset.m;exInfo(UI.sheetEx);break;
 case 'xrange':UI.range=+t.dataset.v;exInfo(UI.sheetEx);break;
 case 'fav':{const f=S.settings.favs=S.settings.favs||[];const id=t.dataset.ex;const k=f.indexOf(id);if(k>=0)f.splice(k,1);else f.push(id);saveSettings();exInfo(id);if(route()==='library')render();break;}
 case 'share':{const ex=EXM[t.dataset.ex];const p=perfs(ex.id)[0];const txt=`${ex.he}\n${ex.cues.map((c,i)=>(i+1)+'. '+c).join('\n')}${p?`\nאחרון (${p.date}): ${p.sets.map(s=>(+s.w?fmtW(s.w)+'×':'')+s.r).join(', ')}`:''}\nhttps://www.youtube.com/results?search_query=${encodeURIComponent(ex.en+' proper form')}`;navigator.clipboard.writeText(txt).then(()=>toast('הועתק. אפשר להדביק בוואטסאפ'),()=>toast('ההעתקה נחסמה בדפדפן'));break;}
 case 'figplay':case 'figspeed':{const sv=document.querySelector('#sheet svg[data-ctl]');const en=sv&&FIGS.get(sv);if(!en)break;if(A==='figplay'){en.paused=!en.paused;t.textContent=en.paused?'המשך':'השהה';}else{en.speed=en.speed===1?0.5:en.speed===0.5?0.25:1;t.textContent='מהירות '+en.speed+'×';}break;}
 case 'closesheet':if(useLocalProfiles()&&!CURP)break;closeSheet();break;
 case 'lib':UI.lib=t.dataset.a;render();break;
 case 'metric':UI.metric=t.dataset.m;render();break;
 case 'range':UI.range=+t.dataset.v;render();break;
 case 'cardio':cardioSheet(t.dataset.k);break;
 case 'delsess':dialog('למחוק את האימון?','האימון יוסר מההיסטוריה ומהגרפים.',`<button class="btn danger" data-act="delok" data-id="${t.dataset.id}">מחק</button>`);break;
 case 'delok':delSession(t.dataset.id);closeSheet();render();break;
 case 'planarea':{const p=S.settings.plan[i];const x=t.dataset.a;p.areas=p.areas.includes(x)?p.areas.filter(y=>y!==x):[...p.areas,x];saveSettings();render();break;}
 case 'export':openSheet(`<div class="row between"><h2>גיבוי</h2><button class="btn sm ghost" data-act="closesheet">סגור</button></div><p class="small muted" style="margin:0">שמור את הטקסט הזה בקובץ או בהערה. אפשר לשחזר ממנו בכל מכשיר.</p><textarea id="bk" class="full" rows="8" dir="ltr" readonly>${esc(JSON.stringify({v:1,settings:S.settings,sessions:S.sessions}))}</textarea><button class="btn primary" data-act="copybk">העתק</button>`);break;
 case 'copybk':navigator.clipboard.writeText($('#bk').value).then(()=>toast('הגיבוי הועתק'),()=>{$('#bk').select();toast('סמן והעתק ידנית');});break;
 case 'import':openSheet(`<div class="row between"><h2>שחזור מגיבוי</h2><button class="btn sm ghost" data-act="closesheet">סגור</button></div><textarea id="bkin" class="full" rows="8" dir="ltr" placeholder="הדבק כאן את הגיבוי"></textarea><button class="btn primary" data-act="doimport">שחזר ומזג</button>`);break;
 case 'doimport':{try{const j=JSON.parse($('#bkin').value);const ids=new Set(S.sessions.map(s=>s.id));let n=0;(j.sessions||[]).forEach(s=>{if(s&&s.id&&!ids.has(s.id)){S.sessions.push(s);saveSession(s);n++;}});if(j.settings){S.settings=Object.assign(JSON.parse(JSON.stringify(DEF)),j.settings);saveSettings();}closeSheet();toast(`שוחזרו ${n} אימונים`);render();}catch(err){toast('הטקסט אינו גיבוי תקין');}break;}
 case 'reset':dialog('למחוק את כל הנתונים?','כל האימונים, ההגדרות והתוכנית יימחקו לצמיתות. כדאי לייצא גיבוי קודם.','<button class="btn danger" data-act="resetok">מחק הכול</button>');break;
 case 'resetok':S.sessions.forEach(s=>dbPut('s-'+s.id,null));S={settings:JSON.parse(JSON.stringify(DEF)),sessions:[],active:null};saveSettings();saveActive(true);UI.draft=null;closeSheet();toast('הנתונים נמחקו');render();break;
 }
});
document.addEventListener('input',e=>{const t=e.target;const f=t.dataset&&t.dataset.f;if(t.closest('#cform')){calcCardio();return;}if(!f)return;
 if(f==='w'||f==='r'){const s=S.active.items[+t.dataset.i].sets[+t.dataset.s];const v=String(t.value).replace(',','.');s[f]=v===''?'':+v;
  if(f==='w'&&v!==''){const it=S.active.items[+t.dataset.i];it.sets.forEach((o,k)=>{if(k>+t.dataset.s&&!o.done&&(o.w===''||o.w==null||o.auto)){o.w=+v;o.auto=1;const n=document.getElementById(`w-${t.dataset.i}-${k}`);if(n)n.value=v;}});s.auto=0;}
  saveActive();}
 else if(f==='note'){S.active.note=t.value;saveActive();}
 else if(f==='libq'){UI.q=t.value;const pos=t.selectionStart;render();const n=$('#libq');n.focus();try{n.setSelectionRange(pos,pos);}catch(_){}}
 else if(f==='plan'){S.settings.plan[+t.dataset.i].l=t.value;clearTimeout(e.target._t);e.target._t=setTimeout(saveSettings,600);}
});
document.addEventListener('change',e=>{const t=e.target;if(t.id==='pf-askeach'){lsSet('gym.askeach',t.checked);return;}const f=t.dataset&&t.dataset.f;
 if(t.id==='garmin'||t.id==='garmin2'){const file=t.files[0];if(file){const rd=new FileReader();rd.onload=()=>importGarmin(String(rd.result));rd.readAsText(file);}t.value='';return;}
 if(t.id==='c-plan'){const c=CARDIO[$('#cform').dataset.kind];const p=c.plans.find(x=>x.id===t.value);$('#c-desc').textContent=p?p.d:'';if(p)$('#c-dur').value=p.dur;calcCardio();return;}
 if(!f)return;
 if(f==='set'){const k=t.dataset.k;S.settings[k]=k==='goal'?t.value:k==='sound'?!!t.value:(+String(t.value).replace(',','.')||DEF[k]);saveSettings();if(k==='goal'&&UI.draft)UI.draft.goal=t.value;}
 else if(f==='plank'){const p=S.settings.plan[+t.dataset.i];const v=t.value;delete p.cardio;delete p.areas;if(v==='rest'){}else if(v)p.cardio=v;else p.areas=['chest'];saveSettings();render();}
 else if(f==='exsel'){UI.ex=t.value;render();}
 else if(f==='vid'){const v=t.value.trim();if(v&&!/^https?:\/\//.test(v)){toast('הקישור צריך להתחיל ב-https://');return;}if(v)S.settings.videos[t.dataset.ex]=v;else delete S.settings.videos[t.dataset.ex];saveSettings();toast('הקישור נשמר');}
});
document.addEventListener('submit',e=>{if(e.target.id==='pform'){e.preventDefault();saveProfileForm();return;}
 if(e.target.id==='pinf'){e.preventDefault();(async()=>{const id=e.target.dataset.id;const p=PROFILES.find(x=>x.id===id);const h=await pinHash(id,$('#pin-in').value.trim());if(h===p.pin)switchProfile(id);else{$('#pin-msg').textContent='קוד שגוי';$('#pin-in').value='';}})();return;}
 if(e.target.id==='authf'){e.preventDefault();doAuth(e.target.dataset.mode);return;}if(e.target.id==='exf'){e.preventDefault();const c=readExForm();if(!c.he){toast('צריך שם לתרגיל');return;}if(!c.mu[0].length)c.mu[0]=[{chest:'chest',back:'lats',shoulders:'delts_s',biceps:'biceps',triceps:'triceps',legs:'quads',core:'abs'}[c.a]];if(!c.eq.length)c.eq=['bw'];const L=S.settings.custom=S.settings.custom||[];const k=L.findIndex(x=>x.id===c.id);if(k>=0)L[k]=c;else L.push(c);saveSettings();syncCustom();closeSheet();UI.lib=c.a;go('library');toast('התרגיל נשמר ונכנס לבניית האימונים');return;}
 if(e.target.id==='chatf'){e.preventDefault();const v=$('#chatin').value;aiAsk(v);return;}if(e.target.id!=='cform')return;e.preventDefault();const kind=e.target.dataset.kind;const c=CARDIO[kind];const date=$('#c-date').value||today();const pl=c.plans.find(p=>p.id===$('#c-plan').value);
 const s={id:uid(),type:'cardio',kind,source:'manual',date,start:new Date(date+'T'+(date===today()?new Date().toTimeString().slice(0,5):'12:00')).getTime(),durMin:numv($('#c-dur').value),distKm:numv($('#c-dist').value),kcal:numv($('#c-kcal').value)||'',avgHr:numv($('#c-avg').value)||'',maxHr:numv($('#c-max').value)||'',rpe:+$('#c-rpe').value,plan:pl?pl.he:'',note:$('#c-note').value};
 if(!s.durMin){toast('הזן משך אימון בדקות');return;}S.sessions.push(s);saveSession(s);closeSheet();toast(`${c.he} נשמר${s.distKm?`: ${s.distKm} ק״מ`:''}`);render();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!(useLocalProfiles()&&!CURP))closeSheet();if(Q.open)closeQ();}});
window.addEventListener('hashchange',()=>{closeSheet();render();window.scrollTo(0,0);});

if(useLocalProfiles())initProfiles();else{loadLocal();syncCustom();render();}initCloud();
if('serviceWorker' in navigator&&location.protocol==='https:'&&!window.claude){navigator.serviceWorker.register('/sw.js').catch(()=>{});}
