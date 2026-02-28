/**
 * i18n — Internationalization System
 * Supports 10 languages with localStorage persistence
 */

const TRANSLATIONS = {
    en: {
        _name: 'English',
        _flag: '🇬🇧',
        // Panel
        panelTitle: '💡 Idea Control Panel',
        dashboard: '📊 Dashboard',
        notConnected: 'Not connected',
        connected: 'connected',
        youtube: 'YouTube',
        twitch: 'Twitch',
        kick: 'Kick',
        connect: 'Connect',
        ytPlaceholder: 'YouTube Live ID or Channel ID',
        ytHelp: 'Live ID: the code after ?v= in the YouTube stream URL',
        twitchPlaceholder: 'Twitch channel name (e.g. xQc)',
        twitchHelp: 'Just type the channel name, no # needed',
        kickPlaceholder: 'Kick channel slug (e.g. xqc)',
        kickHelp: 'Type the channel name from kick.com/channel-name',
        recentConnections: 'Recent connections:',
        testMode: 'Test Mode',
        testUser: 'Username',
        testPlaceholder: 'Write an idea...',
        testSend: 'Send Test Idea',
        pendingIdeas: 'Pending Ideas',
        noIdeas: 'No ideas yet — viewers type /idea, /fikir, /idée, /идея etc. to submit (30+ languages)',
        acceptedIdeas: '✅ Accepted Ideas',
        accept: '✅ Accept',
        reject: '❌ Reject',
        inProgress: '🔨 In Progress',
        completed: '✅ Completed',
        shortcuts: '⌨️ Shortcuts:',
        shortcutAccept: 'Accept',
        shortcutReject: 'Reject',
        shortcutNav: 'Navigate',
        // Overlay
        newIdea: 'New Idea!',
        waitingResponse: 'Waiting for response...',
        // Dashboard
        dashTitle: '💡 Idea Dashboard',
        backToPanel: '← Back to Panel',
        searchPlaceholder: 'Search ideas or authors...',
        totalIdeas: 'Total Ideas',
        accepted: 'Accepted',
        inProgressLabel: 'In Progress',
        completedLabel: 'Completed',
        totalStreams: 'Total Streams',
        streamHistory: '📺 Stream History',
        ideas: 'Ideas',
        ideasTitle: 'Ideas',
        allStatuses: 'All Statuses',
        statusAccepted: 'Accepted',
        statusInProgress: 'In Progress',
        statusCompleted: 'Completed',
        statusRejected: 'Rejected',
        statusPending: 'Pending',
        selectStream: 'Select a stream to view its ideas',
        noResults: 'No results found',
        noStreams: 'No stream records yet',
        noIdeasFilter: 'No ideas match this filter',
        topAuthors: '🏆 Top Authors',
        noAuthors: 'No authors yet',
        searchResults: '🔍 Search Results',
        accepted_count: 'accepted',
        stream: 'Stream',
        loading: 'Loading...',
        // Status badges
        badgePending: '⏳ Pending',
        badgeAccepted: '✅ Accepted',
        badgeRejected: '❌ Rejected',
        badgeInProgress: '🔨 In Progress',
        badgeCompleted: '🎉 Completed',
    },

    tr: {
        _name: 'Türkçe',
        _flag: '🇹🇷',
        panelTitle: '💡 Fikir Kontrol Paneli',
        dashboard: '📊 Dashboard',
        notConnected: 'Bağlı değil',
        connected: 'bağlı',
        youtube: 'YouTube',
        twitch: 'Twitch',
        kick: 'Kick',
        connect: 'Bağlan',
        ytPlaceholder: 'YouTube Live ID veya Channel ID',
        ytHelp: 'Live ID: YouTube yayın URL\'sindeki ?v= sonrası kod',
        twitchPlaceholder: 'Twitch kanal adı (örn: xQc)',
        twitchHelp: 'Kanal adını yazmanız yeterli, # işareti gerekmez',
        kickPlaceholder: 'Kick kanal slug (örn: xqc)',
        kickHelp: 'kick.com/kanal-adi URL\'sindeki kanal adını yazın',
        recentConnections: 'Son bağlantılar:',
        testMode: 'Test Modu',
        testUser: 'Kullanıcı adı',
        testPlaceholder: 'Fikir yaz...',
        testSend: 'Test Fikir Gönder',
        pendingIdeas: 'Bekleyen Fikirler',
        noIdeas: 'Henüz fikir yok — izleyiciler /fikir, /idea, /idée, /идея vb. yazınca burada görünecek (30+ dil)',
        acceptedIdeas: '✅ Kabul Edilen Fikirler',
        accept: '✅ Kabul',
        reject: '❌ Red',
        inProgress: '🔨 Yapılıyor',
        completed: '✅ Tamamlandı',
        shortcuts: '⌨️ Kısayollar:',
        shortcutAccept: 'Kabul',
        shortcutReject: 'Red',
        shortcutNav: 'Seçim',
        newIdea: 'Yeni Fikir!',
        waitingResponse: 'Yanıt bekleniyor...',
        dashTitle: '💡 Fikir Dashboard',
        backToPanel: '← Panele Dön',
        searchPlaceholder: 'Fikir veya yazar ara...',
        totalIdeas: 'Toplam Fikir',
        accepted: 'Kabul Edilen',
        inProgressLabel: 'Yapılıyor',
        completedLabel: 'Tamamlanan',
        totalStreams: 'Toplam Yayın',
        streamHistory: '📺 Yayın Geçmişi',
        ideas: 'fikir',
        ideasTitle: 'Fikirler',
        allStatuses: 'Tüm Durumlar',
        statusAccepted: 'Kabul Edilen',
        statusInProgress: 'Yapılıyor',
        statusCompleted: 'Tamamlanan',
        statusRejected: 'Reddedilen',
        statusPending: 'Bekleyen',
        selectStream: 'Bir yayın seçerek fikirlerini görüntüle',
        noResults: 'Sonuç bulunamadı',
        noStreams: 'Henüz yayın kaydı yok',
        noIdeasFilter: 'Bu filtreye uygun fikir yok',
        topAuthors: '🏆 En Aktif Yazarlar',
        noAuthors: 'Henüz yazar yok',
        searchResults: '🔍 Arama Sonuçları',
        accepted_count: 'kabul',
        stream: 'Yayın',
        loading: 'Yükleniyor...',
        badgePending: '⏳ Bekliyor',
        badgeAccepted: '✅ Kabul',
        badgeRejected: '❌ Red',
        badgeInProgress: '🔨 Yapılıyor',
        badgeCompleted: '🎉 Tamamlandı',
    },

    es: {
        _name: 'Español',
        _flag: '🇪🇸',
        panelTitle: '💡 Panel de Control de Ideas',
        dashboard: '📊 Dashboard',
        notConnected: 'No conectado',
        connected: 'conectado',
        youtube: 'YouTube', twitch: 'Twitch', kick: 'Kick',
        connect: 'Conectar',
        ytPlaceholder: 'YouTube Live ID o Channel ID',
        ytHelp: 'Live ID: el código después de ?v= en la URL del stream',
        twitchPlaceholder: 'Nombre del canal de Twitch',
        twitchHelp: 'Solo escribe el nombre del canal',
        kickPlaceholder: 'Slug del canal de Kick',
        kickHelp: 'Escribe el nombre del canal de kick.com',
        recentConnections: 'Conexiones recientes:',
        testMode: 'Modo de Prueba',
        testUser: 'Nombre de usuario',
        testPlaceholder: 'Escribe una idea...',
        testSend: 'Enviar Idea de Prueba',
        pendingIdeas: 'Ideas Pendientes',
        noIdeas: 'Aún no hay ideas — los viewers escriben /idea, /fikir, /idée etc. para enviar (30+ idiomas)',
        acceptedIdeas: '✅ Ideas Aceptadas',
        accept: '✅ Aceptar', reject: '❌ Rechazar',
        inProgress: '🔨 En Progreso', completed: '✅ Completado',
        shortcuts: '⌨️ Atajos:', shortcutAccept: 'Aceptar', shortcutReject: 'Rechazar', shortcutNav: 'Navegar',
        newIdea: '¡Nueva Idea!', waitingResponse: 'Esperando respuesta...',
        dashTitle: '💡 Dashboard de Ideas', backToPanel: '← Volver al Panel',
        searchPlaceholder: 'Buscar ideas o autores...',
        totalIdeas: 'Total Ideas', accepted: 'Aceptadas',
        inProgressLabel: 'En Progreso', completedLabel: 'Completadas', totalStreams: 'Total Streams',
        streamHistory: '📺 Historial de Streams',
        ideas: 'ideas', ideasTitle: 'Ideas',
        allStatuses: 'Todos', statusAccepted: 'Aceptadas', statusInProgress: 'En Progreso',
        statusCompleted: 'Completadas', statusRejected: 'Rechazadas', statusPending: 'Pendientes',
        selectStream: 'Selecciona un stream para ver sus ideas',
        noResults: 'Sin resultados', noStreams: 'No hay registros de streams',
        noIdeasFilter: 'No hay ideas con este filtro',
        topAuthors: '🏆 Top Autores', noAuthors: 'Aún no hay autores',
        searchResults: '🔍 Resultados', accepted_count: 'aceptadas',
        stream: 'Stream', loading: 'Cargando...',
        badgePending: '⏳ Pendiente', badgeAccepted: '✅ Aceptada', badgeRejected: '❌ Rechazada',
        badgeInProgress: '🔨 En Progreso', badgeCompleted: '🎉 Completada',
    },

    pt: {
        _name: 'Português',
        _flag: '🇧🇷',
        panelTitle: '💡 Painel de Controle de Ideias',
        dashboard: '📊 Dashboard', notConnected: 'Desconectado', connected: 'conectado',
        youtube: 'YouTube', twitch: 'Twitch', kick: 'Kick', connect: 'Conectar',
        ytPlaceholder: 'YouTube Live ID ou Channel ID',
        ytHelp: 'Live ID: o código após ?v= na URL da stream',
        twitchPlaceholder: 'Nome do canal Twitch', twitchHelp: 'Apenas digite o nome do canal',
        kickPlaceholder: 'Slug do canal Kick', kickHelp: 'Digite o nome do canal de kick.com',
        recentConnections: 'Conexões recentes:', testMode: 'Modo de Teste',
        testUser: 'Nome de usuário', testPlaceholder: 'Escreva uma ideia...', testSend: 'Enviar Ideia Teste',
        pendingIdeas: 'Ideias Pendentes',
        noIdeas: 'Nenhuma ideia ainda — os viewers digitam /idea, /fikir, /idée etc. para enviar (30+ idiomas)',
        acceptedIdeas: '✅ Ideias Aceitas', accept: '✅ Aceitar', reject: '❌ Rejeitar',
        inProgress: '🔨 Em Progresso', completed: '✅ Concluído',
        shortcuts: '⌨️ Atalhos:', shortcutAccept: 'Aceitar', shortcutReject: 'Rejeitar', shortcutNav: 'Navegar',
        newIdea: 'Nova Ideia!', waitingResponse: 'Aguardando resposta...',
        dashTitle: '💡 Dashboard de Ideias', backToPanel: '← Voltar ao Painel',
        searchPlaceholder: 'Buscar ideias ou autores...',
        totalIdeas: 'Total Ideias', accepted: 'Aceitas',
        inProgressLabel: 'Em Progresso', completedLabel: 'Concluídas', totalStreams: 'Total Streams',
        streamHistory: '📺 Histórico de Streams', ideas: 'ideias', ideasTitle: 'Ideias',
        allStatuses: 'Todos', statusAccepted: 'Aceitas', statusInProgress: 'Em Progresso',
        statusCompleted: 'Concluídas', statusRejected: 'Rejeitadas', statusPending: 'Pendentes',
        selectStream: 'Selecione uma stream para ver suas ideias',
        noResults: 'Sem resultados', noStreams: 'Nenhum registro de stream',
        noIdeasFilter: 'Nenhuma ideia com este filtro',
        topAuthors: '🏆 Top Autores', noAuthors: 'Nenhum autor ainda',
        searchResults: '🔍 Resultados', accepted_count: 'aceitas',
        stream: 'Stream', loading: 'Carregando...',
        badgePending: '⏳ Pendente', badgeAccepted: '✅ Aceita', badgeRejected: '❌ Rejeitada',
        badgeInProgress: '🔨 Em Progresso', badgeCompleted: '🎉 Concluída',
    },

    fr: {
        _name: 'Français',
        _flag: '🇫🇷',
        panelTitle: '💡 Panneau de Contrôle des Idées',
        dashboard: '📊 Tableau de bord', notConnected: 'Non connecté', connected: 'connecté',
        youtube: 'YouTube', twitch: 'Twitch', kick: 'Kick', connect: 'Connecter',
        ytPlaceholder: 'YouTube Live ID ou Channel ID',
        ytHelp: 'Live ID: le code après ?v= dans l\'URL du stream',
        twitchPlaceholder: 'Nom de la chaîne Twitch', twitchHelp: 'Tapez simplement le nom de la chaîne',
        kickPlaceholder: 'Slug de la chaîne Kick', kickHelp: 'Tapez le nom de la chaîne kick.com',
        recentConnections: 'Connexions récentes:', testMode: 'Mode Test',
        testUser: 'Nom d\'utilisateur', testPlaceholder: 'Écrivez une idée...', testSend: 'Envoyer Idée Test',
        pendingIdeas: 'Idées en Attente',
        noIdeas: 'Pas encore d\'idées — les viewers tapent /idée, /idea, /fikir etc. pour soumettre (30+ langues)',
        acceptedIdeas: '✅ Idées Acceptées', accept: '✅ Accepter', reject: '❌ Refuser',
        inProgress: '🔨 En Cours', completed: '✅ Terminé',
        shortcuts: '⌨️ Raccourcis:', shortcutAccept: 'Accepter', shortcutReject: 'Refuser', shortcutNav: 'Naviguer',
        newIdea: 'Nouvelle Idée!', waitingResponse: 'En attente de réponse...',
        dashTitle: '💡 Tableau de Bord des Idées', backToPanel: '← Retour au Panneau',
        searchPlaceholder: 'Rechercher des idées ou des auteurs...',
        totalIdeas: 'Total Idées', accepted: 'Acceptées',
        inProgressLabel: 'En Cours', completedLabel: 'Terminées', totalStreams: 'Total Streams',
        streamHistory: '📺 Historique des Streams', ideas: 'idées', ideasTitle: 'Idées',
        allStatuses: 'Tous', statusAccepted: 'Acceptées', statusInProgress: 'En Cours',
        statusCompleted: 'Terminées', statusRejected: 'Refusées', statusPending: 'En Attente',
        selectStream: 'Sélectionnez un stream pour voir ses idées',
        noResults: 'Aucun résultat', noStreams: 'Aucun enregistrement de stream',
        noIdeasFilter: 'Aucune idée avec ce filtre',
        topAuthors: '🏆 Top Auteurs', noAuthors: 'Aucun auteur encore',
        searchResults: '🔍 Résultats', accepted_count: 'acceptées',
        stream: 'Stream', loading: 'Chargement...',
        badgePending: '⏳ En Attente', badgeAccepted: '✅ Acceptée', badgeRejected: '❌ Refusée',
        badgeInProgress: '🔨 En Cours', badgeCompleted: '🎉 Terminée',
    },

    de: {
        _name: 'Deutsch',
        _flag: '🇩🇪',
        panelTitle: '💡 Ideen-Kontrollpanel',
        dashboard: '📊 Dashboard', notConnected: 'Nicht verbunden', connected: 'verbunden',
        youtube: 'YouTube', twitch: 'Twitch', kick: 'Kick', connect: 'Verbinden',
        ytPlaceholder: 'YouTube Live ID oder Channel ID',
        ytHelp: 'Live ID: der Code nach ?v= in der Stream-URL',
        twitchPlaceholder: 'Twitch Kanalname', twitchHelp: 'Einfach den Kanalnamen eingeben',
        kickPlaceholder: 'Kick Kanal-Slug', kickHelp: 'Kanalnamen von kick.com eingeben',
        recentConnections: 'Letzte Verbindungen:', testMode: 'Testmodus',
        testUser: 'Benutzername', testPlaceholder: 'Idee schreiben...', testSend: 'Test-Idee senden',
        pendingIdeas: 'Ausstehende Ideen',
        noIdeas: 'Noch keine Ideen — Zuschauer geben /idea, /fikir, /idée usw. ein (30+ Sprachen)',
        acceptedIdeas: '✅ Akzeptierte Ideen', accept: '✅ Akzeptieren', reject: '❌ Ablehnen',
        inProgress: '🔨 In Arbeit', completed: '✅ Abgeschlossen',
        shortcuts: '⌨️ Tastenkürzel:', shortcutAccept: 'Akzeptieren', shortcutReject: 'Ablehnen', shortcutNav: 'Navigieren',
        newIdea: 'Neue Idee!', waitingResponse: 'Warte auf Antwort...',
        dashTitle: '💡 Ideen-Dashboard', backToPanel: '← Zurück zum Panel',
        searchPlaceholder: 'Ideen oder Autoren suchen...',
        totalIdeas: 'Gesamt Ideen', accepted: 'Akzeptiert',
        inProgressLabel: 'In Arbeit', completedLabel: 'Abgeschlossen', totalStreams: 'Gesamt Streams',
        streamHistory: '📺 Stream-Verlauf', ideas: 'Ideen', ideasTitle: 'Ideen',
        allStatuses: 'Alle', statusAccepted: 'Akzeptiert', statusInProgress: 'In Arbeit',
        statusCompleted: 'Abgeschlossen', statusRejected: 'Abgelehnt', statusPending: 'Ausstehend',
        selectStream: 'Wähle einen Stream um seine Ideen zu sehen',
        noResults: 'Keine Ergebnisse', noStreams: 'Noch keine Stream-Einträge',
        noIdeasFilter: 'Keine Ideen mit diesem Filter',
        topAuthors: '🏆 Top Autoren', noAuthors: 'Noch keine Autoren',
        searchResults: '🔍 Ergebnisse', accepted_count: 'akzeptiert',
        stream: 'Stream', loading: 'Laden...',
        badgePending: '⏳ Ausstehend', badgeAccepted: '✅ Akzeptiert', badgeRejected: '❌ Abgelehnt',
        badgeInProgress: '🔨 In Arbeit', badgeCompleted: '🎉 Abgeschlossen',
    },

    ru: {
        _name: 'Русский',
        _flag: '🇷🇺',
        panelTitle: '💡 Панель Управления Идеями',
        dashboard: '📊 Дашборд', notConnected: 'Не подключено', connected: 'подключено',
        youtube: 'YouTube', twitch: 'Twitch', kick: 'Kick', connect: 'Подключить',
        ytPlaceholder: 'YouTube Live ID или Channel ID',
        ytHelp: 'Live ID: код после ?v= в URL стрима',
        twitchPlaceholder: 'Название канала Twitch', twitchHelp: 'Просто введите название канала',
        kickPlaceholder: 'Slug канала Kick', kickHelp: 'Введите название канала kick.com',
        recentConnections: 'Недавние подключения:', testMode: 'Тестовый Режим',
        testUser: 'Имя пользователя', testPlaceholder: 'Напишите идею...', testSend: 'Отправить Тест',
        pendingIdeas: 'Ожидающие Идеи',
        noIdeas: 'Пока нет идей — зрители пишут /идея, /idea, /fikir и т.д. (30+ языков)',
        acceptedIdeas: '✅ Принятые Идеи', accept: '✅ Принять', reject: '❌ Отклонить',
        inProgress: '🔨 В Работе', completed: '✅ Завершено',
        shortcuts: '⌨️ Горячие клавиши:', shortcutAccept: 'Принять', shortcutReject: 'Отклонить', shortcutNav: 'Навигация',
        newIdea: 'Новая Идея!', waitingResponse: 'Ожидание ответа...',
        dashTitle: '💡 Дашборд Идей', backToPanel: '← Назад к Панели',
        searchPlaceholder: 'Поиск идей или авторов...',
        totalIdeas: 'Всего Идей', accepted: 'Принято',
        inProgressLabel: 'В Работе', completedLabel: 'Завершено', totalStreams: 'Всего Стримов',
        streamHistory: '📺 История Стримов', ideas: 'идей', ideasTitle: 'Идеи',
        allStatuses: 'Все', statusAccepted: 'Принятые', statusInProgress: 'В Работе',
        statusCompleted: 'Завершённые', statusRejected: 'Отклонённые', statusPending: 'Ожидающие',
        selectStream: 'Выберите стрим для просмотра идей',
        noResults: 'Нет результатов', noStreams: 'Нет записей стримов',
        noIdeasFilter: 'Нет идей с этим фильтром',
        topAuthors: '🏆 Топ Авторы', noAuthors: 'Пока нет авторов',
        searchResults: '🔍 Результаты', accepted_count: 'принято',
        stream: 'Стрим', loading: 'Загрузка...',
        badgePending: '⏳ Ожидает', badgeAccepted: '✅ Принята', badgeRejected: '❌ Отклонена',
        badgeInProgress: '🔨 В Работе', badgeCompleted: '🎉 Завершена',
    },

    ja: {
        _name: '日本語',
        _flag: '🇯🇵',
        panelTitle: '💡 アイデアコントロールパネル',
        dashboard: '📊 ダッシュボード', notConnected: '未接続', connected: '接続済み',
        youtube: 'YouTube', twitch: 'Twitch', kick: 'Kick', connect: '接続',
        ytPlaceholder: 'YouTube Live IDまたはChannel ID',
        ytHelp: 'Live ID: ストリームURLの?v=の後のコード',
        twitchPlaceholder: 'Twitchチャンネル名', twitchHelp: 'チャンネル名を入力するだけ',
        kickPlaceholder: 'Kickチャンネルスラッグ', kickHelp: 'kick.comのチャンネル名を入力',
        recentConnections: '最近の接続:', testMode: 'テストモード',
        testUser: 'ユーザー名', testPlaceholder: 'アイデアを書く...', testSend: 'テスト送信',
        pendingIdeas: '保留中のアイデア',
        noIdeas: 'まだアイデアなし — 視聴者が /idea, /アイデア 等で送信 (30+言語)',
        acceptedIdeas: '✅ 承認済みアイデア', accept: '✅ 承認', reject: '❌ 却下',
        inProgress: '🔨 進行中', completed: '✅ 完了',
        shortcuts: '⌨️ ショートカット:', shortcutAccept: '承認', shortcutReject: '却下', shortcutNav: 'ナビ',
        newIdea: '新しいアイデア！', waitingResponse: '応答待ち...',
        dashTitle: '💡 アイデアダッシュボード', backToPanel: '← パネルに戻る',
        searchPlaceholder: 'アイデアや著者を検索...',
        totalIdeas: '合計アイデア', accepted: '承認済み',
        inProgressLabel: '進行中', completedLabel: '完了', totalStreams: '合計配信',
        streamHistory: '📺 配信履歴', ideas: 'アイデア', ideasTitle: 'アイデア',
        allStatuses: 'すべて', statusAccepted: '承認済み', statusInProgress: '進行中',
        statusCompleted: '完了', statusRejected: '却下', statusPending: '保留中',
        selectStream: '配信を選択してアイデアを表示',
        noResults: '結果なし', noStreams: '配信記録なし', noIdeasFilter: 'フィルターに一致するアイデアなし',
        topAuthors: '🏆 トップ著者', noAuthors: 'まだ著者なし',
        searchResults: '🔍 検索結果', accepted_count: '承認',
        stream: '配信', loading: '読み込み中...',
        badgePending: '⏳ 保留中', badgeAccepted: '✅ 承認済', badgeRejected: '❌ 却下',
        badgeInProgress: '🔨 進行中', badgeCompleted: '🎉 完了',
    },

    ko: {
        _name: '한국어',
        _flag: '🇰🇷',
        panelTitle: '💡 아이디어 제어판',
        dashboard: '📊 대시보드', notConnected: '연결 안됨', connected: '연결됨',
        youtube: 'YouTube', twitch: 'Twitch', kick: 'Kick', connect: '연결',
        ytPlaceholder: 'YouTube Live ID 또는 Channel ID',
        ytHelp: 'Live ID: 스트림 URL의 ?v= 뒤의 코드',
        twitchPlaceholder: 'Twitch 채널명', twitchHelp: '채널 이름만 입력하세요',
        kickPlaceholder: 'Kick 채널 슬러그', kickHelp: 'kick.com의 채널 이름을 입력',
        recentConnections: '최근 연결:', testMode: '테스트 모드',
        testUser: '사용자명', testPlaceholder: '아이디어를 적어주세요...', testSend: '테스트 전송',
        pendingIdeas: '대기 중인 아이디어',
        noIdeas: '아직 아이디어 없음 — 시청자가 /idea, /아이디어 등으로 전송 (30+언어)',
        acceptedIdeas: '✅ 수락된 아이디어', accept: '✅ 수락', reject: '❌ 거절',
        inProgress: '🔨 진행 중', completed: '✅ 완료',
        shortcuts: '⌨️ 단축키:', shortcutAccept: '수락', shortcutReject: '거절', shortcutNav: '탐색',
        newIdea: '새 아이디어!', waitingResponse: '응답 대기 중...',
        dashTitle: '💡 아이디어 대시보드', backToPanel: '← 패널로 돌아가기',
        searchPlaceholder: '아이디어 또는 작성자 검색...',
        totalIdeas: '전체 아이디어', accepted: '수락됨',
        inProgressLabel: '진행 중', completedLabel: '완료됨', totalStreams: '전체 스트림',
        streamHistory: '📺 스트림 기록', ideas: '아이디어', ideasTitle: '아이디어',
        allStatuses: '전체', statusAccepted: '수락됨', statusInProgress: '진행 중',
        statusCompleted: '완료됨', statusRejected: '거절됨', statusPending: '대기 중',
        selectStream: '스트림을 선택하여 아이디어를 확인하세요',
        noResults: '결과 없음', noStreams: '스트림 기록 없음', noIdeasFilter: '이 필터에 맞는 아이디어 없음',
        topAuthors: '🏆 탑 작성자', noAuthors: '아직 작성자 없음',
        searchResults: '🔍 검색 결과', accepted_count: '수락',
        stream: '스트림', loading: '로딩 중...',
        badgePending: '⏳ 대기 중', badgeAccepted: '✅ 수락됨', badgeRejected: '❌ 거절됨',
        badgeInProgress: '🔨 진행 중', badgeCompleted: '🎉 완료됨',
    },

    zh: {
        _name: '中文',
        _flag: '🇨🇳',
        panelTitle: '💡 创意控制面板',
        dashboard: '📊 仪表板', notConnected: '未连接', connected: '已连接',
        youtube: 'YouTube', twitch: 'Twitch', kick: 'Kick', connect: '连接',
        ytPlaceholder: 'YouTube Live ID 或 Channel ID',
        ytHelp: 'Live ID: 直播URL中?v=后面的代码',
        twitchPlaceholder: 'Twitch频道名称', twitchHelp: '只需输入频道名称',
        kickPlaceholder: 'Kick频道标识', kickHelp: '输入kick.com的频道名称',
        recentConnections: '最近连接:', testMode: '测试模式',
        testUser: '用户名', testPlaceholder: '写一个创意...', testSend: '发送测试创意',
        pendingIdeas: '待处理的创意',
        noIdeas: '暂无创意 — 观众输入 /idea, /创意 等来提交 (30+语言)',
        acceptedIdeas: '✅ 已接受的创意', accept: '✅ 接受', reject: '❌ 拒绝',
        inProgress: '🔨 进行中', completed: '✅ 已完成',
        shortcuts: '⌨️ 快捷键:', shortcutAccept: '接受', shortcutReject: '拒绝', shortcutNav: '导航',
        newIdea: '新创意！', waitingResponse: '等待回应...',
        dashTitle: '💡 创意仪表板', backToPanel: '← 返回面板',
        searchPlaceholder: '搜索创意或作者...',
        totalIdeas: '总创意', accepted: '已接受',
        inProgressLabel: '进行中', completedLabel: '已完成', totalStreams: '总直播',
        streamHistory: '📺 直播历史', ideas: '创意', ideasTitle: '创意',
        allStatuses: '全部', statusAccepted: '已接受', statusInProgress: '进行中',
        statusCompleted: '已完成', statusRejected: '已拒绝', statusPending: '待处理',
        selectStream: '选择一个直播以查看其创意',
        noResults: '无结果', noStreams: '暂无直播记录', noIdeasFilter: '此筛选无匹配创意',
        topAuthors: '🏆 顶级作者', noAuthors: '暂无作者',
        searchResults: '🔍 搜索结果', accepted_count: '已接受',
        stream: '直播', loading: '加载中...',
        badgePending: '⏳ 待处理', badgeAccepted: '✅ 已接受', badgeRejected: '❌ 已拒绝',
        badgeInProgress: '🔨 进行中', badgeCompleted: '🎉 已完成',
    },
};

// ============================================
// i18n API
// ============================================
const DEFAULT_LANG = 'en';

function getLang() {
    return localStorage.getItem('fikir-lang') || DEFAULT_LANG;
}

function setLang(lang) {
    localStorage.setItem('fikir-lang', lang);
    applyTranslations();
}

function t(key) {
    const lang = getLang();
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS[DEFAULT_LANG][key] || key;
}

function getAvailableLanguages() {
    return Object.entries(TRANSLATIONS).map(([code, data]) => ({
        code,
        name: data._name,
        flag: data._flag,
    }));
}

// Apply translations to all elements with data-i18n attribute
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translated = t(key);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = translated;
        } else if (el.tagName === 'OPTION') {
            el.textContent = translated;
        } else {
            el.textContent = translated;
        }
    });

    // Update page title
    const titleEl = document.querySelector('[data-i18n-title]');
    if (titleEl) {
        document.title = t(titleEl.getAttribute('data-i18n-title'));
    }

    // Update lang selector display
    const langBtn = document.getElementById('lang-current');
    if (langBtn) {
        const lang = getLang();
        const data = TRANSLATIONS[lang];
        langBtn.textContent = `${data._flag} ${data._name}`;
    }
}

// Create language selector dropdown
function createLangSelector(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const current = getLang();
    const data = TRANSLATIONS[current];

    container.innerHTML = `
        <div class="lang-selector">
            <button class="lang-btn" id="lang-current" onclick="toggleLangMenu()">${data._flag} ${data._name}</button>
            <div class="lang-menu" id="lang-menu">
                ${getAvailableLanguages().map(l =>
        `<button class="lang-option ${l.code === current ? 'active' : ''}" onclick="selectLang('${l.code}')">${l.flag} ${l.name}</button>`
    ).join('')}
            </div>
        </div>
    `;
}

function toggleLangMenu() {
    const menu = document.getElementById('lang-menu');
    menu.classList.toggle('open');
}

function selectLang(code) {
    setLang(code);
    document.getElementById('lang-menu').classList.remove('open');
    // Re-render dynamic content if callback exists
    if (typeof onLanguageChange === 'function') onLanguageChange();
    // Refresh lang selector active state
    const containerId = document.querySelector('.lang-selector')?.parentElement?.id;
    if (containerId) createLangSelector(containerId);
}

// Close menu on outside click
document.addEventListener('click', (e) => {
    const menu = document.getElementById('lang-menu');
    if (menu && !e.target.closest('.lang-selector')) {
        menu.classList.remove('open');
    }
});
