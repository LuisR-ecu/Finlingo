export type Language = "English" | "Japanese" | "Chinese Simplified" | "Chinese Traditional"

export type TranslationKey = keyof typeof translations.English

export const translations = {
  English: {
    // Navigation
    dashboard: "Dashboard",
    chat: "Chat",
    lessons: "Lessons",
    profile: "Profile",
    
    // Onboarding
    welcomeTitle: "Welcome to EchoWallet!",
    welcomeSubtitle: "Your Personal Financial Learning Companion",
    letsGetStarted: "Let's get started by learning a bit about you.",
    getStarted: "Get Started",
    next: "Next",
    back: "Back",
    finish: "Finish",
    
    // Onboarding Steps
    selectCountry: "Select your country.",
    selectLanguage: "Select your preferred language.",
    enterName: "What's your name?",
    enterAge: "What's your age?",
    selectAdvisor: "Select your Advisor.",
    youChose: "You chose:",
    
    // Advisors
    bobby: "Bobby",
    bobbyDescription: "Warm & Encouraging",
    jess: "Jess",
    jessDescription: "Professional & Knowledgeable",
    greg: "Greg",
    gregDescription: "Friendly & Patient",
    
    // Countries
    china: "China",
    japan: "Japan",
    taiwan: "Taiwan",
    hongKong: "Hong Kong",
    australia: "Australia",
    
    // Languages
    english: "English",
    japanese: "Japanese (日本語)",
    chineseSimplified: "Chinese Simplified (简体中文)",
    chineseTraditional: "Chinese Traditional (繁體中文)",
    
    // Form Fields
    namePlaceholder: "Enter your name",
    agePlaceholder: "Enter your age",
    emailPlaceholder: "your.email@example.com",
    enterEmail: "Your Email",
    emailAddress: "Email Address",
    
    // Chat
    welcomeToChat: "Welcome to Your Learning Chat!",
    chatDescription: "Ask me anything about personal finance, banking, fraud prevention, or retirement planning. I'm here to help you learn in a safe and friendly environment!",
    suggestedQuestions: "Try asking:",
    question1: "How can I identify phone scams?",
    question2: "What is a savings account?",
    question3: "How do I protect my bank information?",
    typeMessage: "Type your message...",
    send: "Send",
    thinking: "Thinking...",
    loadingProfile: "Loading your profile...",
    pressEnterToSend: "Press Enter to send, Shift+Enter for new line",
    tipCreateLesson: "Tip: You can ask me to create a lesson or quiz about any topic we discuss. Just say \"Can you create a lesson about this?\"",
    
    // Profile
    myProfile: "My Profile",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    profileUpdated: "Profile Updated!",
    profileUpdateSuccess: "Your profile has been successfully updated.",
    name: "Name",
    age: "Age",
    country: "Country",
    language: "Language",
    advisor: "Advisor",
    
    // Dashboard
    welcome: "Welcome",
    learningJourney: "Your Learning Journey",
    completedQuizzes: "Completed Quizzes",
    chatSessions: "Chat Sessions",
    startLearning: "Start Learning",
    continueLearning: "Continue Learning",
    
    // Lessons
    myLessons: "My Lessons",
    noLessons: "No Lessons Yet",
    createFirstLesson: "Start chatting to create your first lesson!",
    flashcard: "Flashcard",
    quiz: "Quiz",
    viewLesson: "View Lesson",
    reviewAndPractice: "Review and practice what you've learned",
    totalLessons: "Total Lessons",
    flashcards: "Flashcards",
    quizzes: "Quizzes",
    filter: "Filter:",
    all: "All",
    noLessonsYet: "No Lessons Yet",
    startChatting: "Start chatting with your AI teacher to generate personalized lessons!",
    noFlashcardsYet: "You don't have any flashcards yet. Chat with your AI teacher to create some!",
    noQuizzesYet: "You don't have any quizzes yet. Chat with your AI teacher to create some!",
    deleteLessonConfirm: "Are you sure you want to delete this lesson?",
    
    // Tool Calls
    searchingWeb: "Searching the web...",
    webSearchCompleted: "Web search completed",
    foundInformation: "Found information about:",
    sources: "Sources",
    sourcesAndCitations: "Sources & Citations",
    creatingLesson: "Creating lesson...",
    lessonCreated: "Lesson created successfully!",
    savedToLibrary: "Saved to your library:",
    
    // Errors
    error: "Error",
    pleaseTryAgain: "Please try again.",
    pleaseWait: "Please wait",
    
    // Onboarding Prompts
    completeOnboarding: "Please Complete Onboarding",
    needOnboarding: "You need to complete the onboarding process first.",
    goToOnboarding: "Go to Onboarding",
    
    // Additional UI text
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon", 
    goodEvening: "Good Evening",
    readyToLearn: "Ready to learn about financial literacy today?",
    chatWithAdvisor: "Chat with your AI financial advisor",
    askQuestions: "Ask questions about banking, investments, fraud prevention, and more",
    reviewMaterials: "Review your saved learning materials",
    lessonsCount: "lessons",
    lessonCount: "lesson",
    personalInformation: "Personal Information",
    accountDetails: "Your account details and preferences",
    email: "Email",
    cancel: "Cancel",
    learningProgress: "Learning Progress",
    achievements: "Your achievements and statistics",
    lessonsCompleted: "Lessons Completed",
    quizzesTaken: "Quizzes Taken",
    flashcardsReviewed: "Flashcards Reviewed",
    dangerZone: "Danger Zone",
    irreversibleActions: "Irreversible actions",
    logOutClearData: "Log Out & Clear Data",
    yearsOld: "years old",
    confirmLogout: "Are you sure you want to log out? Your data will be cleared.",
  },
  
  Japanese: {
    // Navigation
    dashboard: "ダッシュボード",
    chat: "チャット",
    lessons: "レッスン",
    profile: "プロフィール",
    
    // Onboarding
    welcomeTitle: "EchoWalletへようこそ！",
    welcomeSubtitle: "あなたの金融学習パートナー",
    letsGetStarted: "あなたについて少し教えてください。",
    getStarted: "始める",
    next: "次へ",
    back: "戻る",
    finish: "完了",
    
    // Onboarding Steps
    selectCountry: "国を選択してください。",
    selectLanguage: "言語を選択してください。",
    enterName: "お名前は？",
    enterAge: "年齢は？",
    selectAdvisor: "アドバイザーを選択してください。",
    youChose: "選択：",
    
    // Advisors
    bobby: "ボビー",
    bobbyDescription: "温かく励まし上手",
    jess: "ジェス",
    jessDescription: "プロフェッショナル",
    greg: "グレッグ",
    gregDescription: "親切で忍耐強い",
    
    // Countries
    china: "中国",
    japan: "日本",
    taiwan: "台湾",
    hongKong: "香港",
    australia: "オーストラリア",
    
    // Languages
    english: "英語 (English)",
    japanese: "日本語",
    chineseSimplified: "中国語簡体字 (简体中文)",
    chineseTraditional: "中国語繁体字 (繁體中文)",
    
    // Form Fields
    namePlaceholder: "名前を入力",
    agePlaceholder: "年齢を入力",
    emailPlaceholder: "your.email@example.com",
    enterEmail: "メールアドレス",
    emailAddress: "メールアドレス",
    
    // Chat
    welcomeToChat: "学習チャットへようこそ！",
    chatDescription: "個人金融、銀行、詐欺防止、退職計画について何でもお聞きください。安全で親しみやすい環境で学習をサポートします！",
    suggestedQuestions: "質問してみましょう：",
    question1: "電話詐欺を見分けるには？",
    question2: "普通預金口座とは？",
    question3: "銀行情報を守るには？",
    typeMessage: "メッセージを入力...",
    send: "送信",
    thinking: "考え中...",
    loadingProfile: "プロフィールを読み込み中...",
    pressEnterToSend: "Enterキーで送信、Shift+Enterで改行",
    tipCreateLesson: "ヒント：議論したトピックについてレッスンやクイズを作成できます。「これについてレッスンを作成できますか？」と言ってください",
    
    // Profile
    myProfile: "マイプロフィール",
    editProfile: "プロフィール編集",
    saveChanges: "変更を保存",
    profileUpdated: "プロフィール更新完了！",
    profileUpdateSuccess: "プロフィールが正常に更新されました。",
    name: "名前",
    age: "年齢",
    country: "国",
    language: "言語",
    advisor: "アドバイザー",
    
    // Dashboard
    welcome: "ようこそ",
    learningJourney: "あなたの学習の旅",
    completedQuizzes: "完了したクイズ",
    chatSessions: "チャットセッション",
    startLearning: "学習を始める",
    continueLearning: "学習を続ける",
    
    // Lessons
    myLessons: "マイレッスン",
    noLessons: "レッスンがありません",
    createFirstLesson: "チャットして最初のレッスンを作成しましょう！",
    flashcard: "フラッシュカード",
    quiz: "クイズ",
    viewLesson: "レッスンを見る",
    reviewAndPractice: "学んだことを復習して練習しましょう",
    totalLessons: "総レッスン数",
    flashcards: "フラッシュカード",
    quizzes: "クイズ",
    filter: "フィルター：",
    all: "すべて",
    noLessonsYet: "まだレッスンがありません",
    startChatting: "AI教師とチャットして個人化されたレッスンを生成しましょう！",
    noFlashcardsYet: "まだフラッシュカードがありません。AI教師とチャットして作成しましょう！",
    noQuizzesYet: "まだクイズがありません。AI教師とチャットして作成しましょう！",
    deleteLessonConfirm: "このレッスンを削除してもよろしいですか？",
    
    // Tool Calls
    searchingWeb: "ウェブを検索中...",
    webSearchCompleted: "ウェブ検索完了",
    foundInformation: "情報を見つけました：",
    sources: "出典",
    sourcesAndCitations: "出典と引用",
    creatingLesson: "レッスンを作成中...",
    lessonCreated: "レッスンが作成されました！",
    savedToLibrary: "ライブラリに保存：",
    
    // Errors
    error: "エラー",
    pleaseTryAgain: "もう一度お試しください。",
    pleaseWait: "お待ちください",
    
    // Onboarding Prompts
    completeOnboarding: "オンボーディングを完了してください",
    needOnboarding: "まずオンボーディングを完了する必要があります。",
    goToOnboarding: "オンボーディングへ",
    
    // Additional UI text
    goodMorning: "おはようございます",
    goodAfternoon: "こんにちは", 
    goodEvening: "こんばんは",
    readyToLearn: "今日は金融リテラシーについて学ぶ準備はできていますか？",
    chatWithAdvisor: "AI金融アドバイザーとチャット",
    askQuestions: "銀行、投資、詐欺防止などについて質問してください",
    reviewMaterials: "保存された学習資料を確認",
    lessonsCount: "レッスン",
    lessonCount: "レッスン",
    personalInformation: "個人情報",
    accountDetails: "アカウントの詳細と設定",
    email: "メール",
    cancel: "キャンセル",
    learningProgress: "学習進捗",
    achievements: "あなたの成果と統計",
    lessonsCompleted: "完了したレッスン",
    quizzesTaken: "受けたクイズ",
    flashcardsReviewed: "復習したフラッシュカード",
    dangerZone: "危険ゾーン",
    irreversibleActions: "元に戻せない操作",
    logOutClearData: "ログアウト＆データクリア",
    yearsOld: "歳",
    confirmLogout: "ログアウトしてもよろしいですか？データがクリアされます。",
  },
  
  "Chinese Simplified": {
    // Navigation
    dashboard: "仪表板",
    chat: "聊天",
    lessons: "课程",
    profile: "个人资料",
    
    // Onboarding
    welcomeTitle: "欢迎来到EchoWallet！",
    welcomeSubtitle: "您的个人财务学习伙伴",
    letsGetStarted: "让我们先了解一下您。",
    getStarted: "开始",
    next: "下一步",
    back: "返回",
    finish: "完成",
    
    // Onboarding Steps
    selectCountry: "选择您的国家。",
    selectLanguage: "选择您的首选语言。",
    enterName: "您叫什么名字？",
    enterAge: "您多大年纪？",
    selectAdvisor: "选择您的顾问。",
    youChose: "您选择了：",
    
    // Advisors
    bobby: "鲍比",
    bobbyDescription: "温暖且鼓励",
    jess: "杰丝",
    jessDescription: "专业且知识丰富",
    greg: "格雷格",
    gregDescription: "友好且耐心",
    
    // Countries
    china: "中国",
    japan: "日本",
    taiwan: "台湾",
    hongKong: "香港",
    australia: "澳大利亚",
    
    // Languages
    english: "英语 (English)",
    japanese: "日语 (日本語)",
    chineseSimplified: "简体中文",
    chineseTraditional: "繁体中文 (繁體中文)",
    
    // Form Fields
    namePlaceholder: "输入您的名字",
    agePlaceholder: "输入您的年龄",
    emailPlaceholder: "your.email@example.com",
    enterEmail: "您的邮箱",
    emailAddress: "邮箱地址",
    
    // Chat
    welcomeToChat: "欢迎来到学习聊天！",
    chatDescription: "向我询问有关个人财务、银行、防诈骗或退休规划的任何问题。我在这里帮助您在安全友好的环境中学习！",
    suggestedQuestions: "试着问问：",
    question1: "如何识别电话诈骗？",
    question2: "什么是储蓄账户？",
    question3: "如何保护我的银行信息？",
    typeMessage: "输入您的消息...",
    send: "发送",
    thinking: "思考中...",
    loadingProfile: "加载您的资料...",
    pressEnterToSend: "按Enter发送，Shift+Enter换行",
    tipCreateLesson: "提示：您可以要求我创建关于我们讨论的任何主题的课程或测验。只需说\"您能为此创建一个课程吗？\"",
    
    // Profile
    myProfile: "我的资料",
    editProfile: "编辑资料",
    saveChanges: "保存更改",
    profileUpdated: "资料已更新！",
    profileUpdateSuccess: "您的资料已成功更新。",
    name: "姓名",
    age: "年龄",
    country: "国家",
    language: "语言",
    advisor: "顾问",
    
    // Dashboard
    welcome: "欢迎",
    learningJourney: "您的学习之旅",
    completedQuizzes: "已完成的测验",
    chatSessions: "聊天会话",
    startLearning: "开始学习",
    continueLearning: "继续学习",
    
    // Lessons
    myLessons: "我的课程",
    noLessons: "还没有课程",
    createFirstLesson: "开始聊天创建您的第一个课程！",
    flashcard: "闪卡",
    quiz: "测验",
    viewLesson: "查看课程",
    reviewAndPractice: "复习和练习您学到的内容",
    totalLessons: "总课程数",
    flashcards: "闪卡",
    quizzes: "测验",
    filter: "筛选：",
    all: "全部",
    noLessonsYet: "还没有课程",
    startChatting: "开始与您的AI老师聊天，生成个性化课程！",
    noFlashcardsYet: "您还没有闪卡。与您的AI老师聊天创建一些吧！",
    noQuizzesYet: "您还没有测验。与您的AI老师聊天创建一些吧！",
    deleteLessonConfirm: "您确定要删除这个课程吗？",
    
    // Tool Calls
    searchingWeb: "搜索网络中...",
    webSearchCompleted: "网络搜索完成",
    foundInformation: "找到信息：",
    sources: "来源",
    sourcesAndCitations: "来源与引用",
    creatingLesson: "创建课程中...",
    lessonCreated: "课程创建成功！",
    savedToLibrary: "已保存到您的库：",
    
    // Errors
    error: "错误",
    pleaseTryAgain: "请重试。",
    pleaseWait: "请稍候",
    
    // Onboarding Prompts
    completeOnboarding: "请完成入门流程",
    needOnboarding: "您需要先完成入门流程。",
    goToOnboarding: "前往入门",
    
    // Additional UI text
    goodMorning: "早上好",
    goodAfternoon: "下午好", 
    goodEvening: "晚上好",
    readyToLearn: "今天准备好学习金融知识了吗？",
    chatWithAdvisor: "与您的AI金融顾问聊天",
    askQuestions: "询问有关银行、投资、防诈骗等问题",
    reviewMaterials: "查看您保存的学习资料",
    lessonsCount: "课程",
    lessonCount: "课程",
    personalInformation: "个人信息",
    accountDetails: "您的账户详情和偏好设置",
    email: "邮箱",
    cancel: "取消",
    learningProgress: "学习进度",
    achievements: "您的成就和统计",
    lessonsCompleted: "已完成的课程",
    quizzesTaken: "已完成的测验",
    flashcardsReviewed: "已复习的闪卡",
    dangerZone: "危险区域",
    irreversibleActions: "不可逆操作",
    logOutClearData: "登出并清除数据",
    yearsOld: "岁",
    confirmLogout: "您确定要登出吗？您的数据将被清除。",
  },
  
  "Chinese Traditional": {
    // Navigation
    dashboard: "儀表板",
    chat: "聊天",
    lessons: "課程",
    profile: "個人資料",
    
    // Onboarding
    welcomeTitle: "歡迎來到EchoWallet！",
    welcomeSubtitle: "您的個人財務學習夥伴",
    letsGetStarted: "讓我們先了解一下您。",
    getStarted: "開始",
    next: "下一步",
    back: "返回",
    finish: "完成",
    
    // Onboarding Steps
    selectCountry: "選擇您的國家。",
    selectLanguage: "選擇您的首選語言。",
    enterName: "您叫什麼名字？",
    enterAge: "您多大年紀？",
    selectAdvisor: "選擇您的顧問。",
    youChose: "您選擇了：",
    
    // Advisors
    bobby: "鮑比",
    bobbyDescription: "溫暖且鼓勵",
    jess: "傑絲",
    jessDescription: "專業且知識豐富",
    greg: "格雷格",
    gregDescription: "友好且耐心",
    
    // Countries
    china: "中國",
    japan: "日本",
    taiwan: "台灣",
    hongKong: "香港",
    australia: "澳洲",
    
    // Languages
    english: "英文 (English)",
    japanese: "日文 (日本語)",
    chineseSimplified: "簡體中文 (简体中文)",
    chineseTraditional: "繁體中文",
    
    // Form Fields
    namePlaceholder: "輸入您的名字",
    agePlaceholder: "輸入您的年齡",
    emailPlaceholder: "your.email@example.com",
    enterEmail: "您的郵箱",
    emailAddress: "郵箱地址",
    
    // Chat
    welcomeToChat: "歡迎來到學習聊天！",
    chatDescription: "向我詢問有關個人財務、銀行、防詐騙或退休規劃的任何問題。我在這裡幫助您在安全友好的環境中學習！",
    suggestedQuestions: "試著問問：",
    question1: "如何識別電話詐騙？",
    question2: "什麼是儲蓄帳戶？",
    question3: "如何保護我的銀行資料？",
    typeMessage: "輸入您的訊息...",
    send: "發送",
    thinking: "思考中...",
    loadingProfile: "載入您的資料...",
    pressEnterToSend: "按Enter發送，Shift+Enter換行",
    tipCreateLesson: "提示：您可以要求我創建關於我們討論的任何主題的課程或測驗。只需說「您能為此創建一個課程嗎？」",
    
    // Profile
    myProfile: "我的資料",
    editProfile: "編輯資料",
    saveChanges: "儲存更改",
    profileUpdated: "資料已更新！",
    profileUpdateSuccess: "您的資料已成功更新。",
    name: "姓名",
    age: "年齡",
    country: "國家",
    language: "語言",
    advisor: "顧問",
    
    // Dashboard
    welcome: "歡迎",
    learningJourney: "您的學習之旅",
    completedQuizzes: "已完成的測驗",
    chatSessions: "聊天會話",
    startLearning: "開始學習",
    continueLearning: "繼續學習",
    
    // Lessons
    myLessons: "我的課程",
    noLessons: "還沒有課程",
    createFirstLesson: "開始聊天創建您的第一個課程！",
    flashcard: "閃卡",
    quiz: "測驗",
    viewLesson: "查看課程",
    reviewAndPractice: "複習和練習您學到的內容",
    totalLessons: "總課程數",
    flashcards: "閃卡",
    quizzes: "測驗",
    filter: "篩選：",
    all: "全部",
    noLessonsYet: "還沒有課程",
    startChatting: "開始與您的AI老師聊天，生成個人化課程！",
    noFlashcardsYet: "您還沒有閃卡。與您的AI老師聊天創建一些吧！",
    noQuizzesYet: "您還沒有測驗。與您的AI老師聊天創建一些吧！",
    deleteLessonConfirm: "您確定要刪除這個課程嗎？",
    
    // Tool Calls
    searchingWeb: "搜尋網路中...",
    webSearchCompleted: "網路搜尋完成",
    foundInformation: "找到資料：",
    sources: "來源",
    sourcesAndCitations: "來源與引用",
    creatingLesson: "創建課程中...",
    lessonCreated: "課程創建成功！",
    savedToLibrary: "已儲存到您的庫：",
    
    // Errors
    error: "錯誤",
    pleaseTryAgain: "請重試。",
    pleaseWait: "請稍候",
    
    // Onboarding Prompts
    completeOnboarding: "請完成入門流程",
    needOnboarding: "您需要先完成入門流程。",
    goToOnboarding: "前往入門",
    
    // Additional UI text
    goodMorning: "早上好",
    goodAfternoon: "下午好", 
    goodEvening: "晚上好",
    readyToLearn: "今天準備好學習金融知識了嗎？",
    chatWithAdvisor: "與您的AI金融顧問聊天",
    askQuestions: "詢問有關銀行、投資、防詐騙等問題",
    reviewMaterials: "查看您保存的學習資料",
    lessonsCount: "課程",
    lessonCount: "課程",
    personalInformation: "個人資訊",
    accountDetails: "您的帳戶詳情和偏好設定",
    email: "郵箱",
    cancel: "取消",
    learningProgress: "學習進度",
    achievements: "您的成就和統計",
    lessonsCompleted: "已完成的課程",
    quizzesTaken: "已完成的測驗",
    flashcardsReviewed: "已複習的閃卡",
    dangerZone: "危險區域",
    irreversibleActions: "不可逆操作",
    logOutClearData: "登出並清除資料",
    yearsOld: "歲",
    confirmLogout: "您確定要登出嗎？您的資料將被清除。",
  },
}

export function getTranslation(language: Language, key: TranslationKey): string {
  return translations[language][key]
}

