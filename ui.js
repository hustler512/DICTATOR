window.UI = (() => {
  const MAX_WORDS = Infinity;
  const UI_TEXT = {
    en: {
      'home.hero.edit': 'Edit saved project',
      'home.hero.new': 'Listen. Repeat. Learn.',
      'home.h1.edit': 'Update your notes.',
      'home.h1.new': 'Dictate your notes.',
      'home.p.edit': 'Save changes to this listening session.',
      'home.p.new': 'Paste notes, upload a PDF or DOCX, and turn text into speech for studying, revision, language learning, and focused listening.',
      'home.recent': 'Recent projects',
      'home.empty': 'Your saved sessions will appear here.',
      'home.viewAll': 'View all projects',
      'home.placeholder': 'Write or paste your text here...',
      'home.counter': 'words',
      'home.privacy': 'Your notes stay on this device.',
      'home.save': 'Save changes',
      'home.start': 'Start to dictate',
      'home.browse': 'Click to browse',
      'home.drop': 'Drop a file here',
      'home.drag': 'or drag and drop',
      'home.fileType': 'TXT, PDF, or DOCX',
      'project.yourLibrary': 'Your library',
      'project.title': 'Your projects.',
      'project.subtitle': 'Manage your listening sessions. Maximum 20 projects.',
      'project.new': '+ New project',
      'project.demoInfo': 'Built-in test project · {count} groups · Does not count toward your 20-project limit',
      'project.openDemo': 'Open demo',
      'project.open': 'Open',
      'project.rename': 'Rename',
      'project.delete': 'Delete',
      'project.emptyTitle': 'No projects yet.',
      'project.emptyText': 'Start with a note from the Home page.',
      'project.emptyAction': 'Create your first project',
      'project.storageUsed': '{count} of 20 projects used',
      'project.deleteConfirm': 'Delete this project? This cannot be undone.',
      'project.renamed': 'Project renamed.',
      'project.deleted': 'Project deleted.',
      'project.saved': 'Project updated.',
      'project.created': 'Project created.',
      'project.fileLoaded': '{file} loaded.',
      'project.loadFail': 'Could not save project.',
      'project.storageFull': 'Storage full (20/20 projects).',
      'reader.back': '← Back to projects',
      'reader.demo': 'Built-in test project',
      'reader.view': 'Reader view',
      'reader.edit': 'Edit text',
      'reader.words': 'Words',
      'reader.reps': 'Reps',
      'reader.lang': 'Lang',
      'reader.restart': 'Restart',
      'reader.speed': 'Speed',
      'reader.loading': 'Loading browser voice',
      'reader.finished': 'Complete · press Restart to begin again',
      'reader.group': 'Group',
      'reader.repeat': 'Repeat',
      'reader.play': 'Play',
      'reader.pause': 'Pause',
      'about.title': 'A calmer way to learn.',
      'about.body': 'Dictator turns notes, essays, PDFs, and study material into speech so you can listen, repeat, and retain more. It is built for students, language learners, and anyone who wants to dictate notes to a computer and review them by ear in a private browser workflow.',
      'about.section1': 'Designed for repetition',
      'about.section1p': 'Small groups, adjustable pace, and a visible reading highlight help you stay with the sentence instead of racing past it.',
      'about.section2': 'Private by default',
      'about.section2p': 'Your saved projects live in this browser using local storage and IndexedDB. Dictator does not upload your notes to an application server.',
      'how.title': 'How to use Dictator.',
      'how.body': 'Start on Home, paste a note or load a TXT, PDF, or DOCX file, then create a project.',
      'how.build': 'Build a session',
      'how.step1': 'Add your text.',
      'how.step2': 'Choose your default group size, repetitions, speed, and language in Settings.',
      'how.step3': 'Start the session and follow the highlighted groups.',
      'how.questions': 'Questions',
      'how.groupQuestion': 'What does a group mean?',
      'how.groupAnswer': 'A group is the number of words Dictator speaks together before moving on.',
      'how.settingsQuestion': 'Can I change settings while reading?',
      'how.settingsAnswer': 'Yes. Reader controls save changes to the current project and reset grouping when necessary.',
      'privacy.title': 'Privacy policy.',
      'privacy.body': 'Dictator is designed to keep your notes on your device. Projects are stored in this browser and speech is produced by the browser Web Speech API.',
      'privacy.whatLeaves': 'What leaves your device?',
      'privacy.whatLeavesBody': 'Nothing is sent to a Dictator application server. Optional PDF, DOCX, and language-detection libraries may be loaded from their public CDNs when you use those features.',
      'privacy.removing': 'Removing your data',
      'privacy.removingBody': 'Delete individual projects from the Projects page, or clear this site’s browser storage to remove all local data.',
    },
    pt: {
      'home.hero.edit': 'Editar projeto salvo',
      'home.hero.new': 'Escute. Repita. Aprenda.',
      'home.h1.edit': 'Atualize suas anotações.',
      'home.h1.new': 'Ditado de suas anotações.',
      'home.p.edit': 'Salve as alterações desta sessão de escuta.',
      'home.p.new': 'Cole notas, carregue PDF ou DOCX e transforme texto em fala para estudo, revisão, aprendizagem de idiomas e escuta focada.',
      'home.recent': 'Projetos recentes',
      'home.empty': 'Suas sessões salvas aparecerão aqui.',
      'home.viewAll': 'Ver todos os projetos',
      'home.placeholder': 'Escreva ou cole seu texto aqui...',
      'home.counter': 'palavras',
      'home.privacy': 'Suas notas ficam neste dispositivo.',
      'home.save': 'Salvar alterações',
      'home.start': 'Começar a ditar',
      'home.browse': 'Clique para procurar',
      'home.drop': 'Solte um arquivo aqui',
      'home.drag': 'ou arraste e solte',
      'home.fileType': 'TXT, PDF ou DOCX',
      'project.yourLibrary': 'Sua biblioteca',
      'project.title': 'Seus projetos.',
      'project.subtitle': 'Gerencie suas sessões de escuta. Máximo de 20 projetos.',
      'project.new': '+ Novo projeto',
      'project.demoInfo': 'Projeto de teste integrado · {count} grupos · Não conta para o limite de 20 projetos',
      'project.openDemo': 'Abrir demo',
      'project.open': 'Abrir',
      'project.rename': 'Renomear',
      'project.delete': 'Excluir',
      'project.emptyTitle': 'Ainda não há projetos.',
      'project.emptyText': 'Comece com uma nota na página inicial.',
      'project.emptyAction': 'Crie seu primeiro projeto',
      'project.storageUsed': '{count} de 20 projetos usados',
      'project.deleteConfirm': 'Excluir este projeto? Esta ação não pode ser desfeita.',
      'project.renamed': 'Projeto renomeado.',
      'project.deleted': 'Projeto excluído.',
      'project.saved': 'Projeto atualizado.',
      'project.created': 'Projeto criado.',
      'project.fileLoaded': '{file} carregado.',
      'project.loadFail': 'Não foi possível salvar o projeto.',
      'project.storageFull': 'Armazenamento cheio (20/20 projetos).',
      'reader.back': '← Voltar para projetos',
      'reader.demo': 'Projeto de teste integrado',
      'reader.view': 'Modo de leitura',
      'reader.edit': 'Editar texto',
      'reader.words': 'Palavras',
      'reader.reps': 'Repetições',
      'reader.lang': 'Idioma',
      'reader.restart': 'Reiniciar',
      'reader.speed': 'Velocidade',
      'reader.loading': 'Carregando voz do navegador',
      'reader.finished': 'Concluído · pressione Reiniciar para começar de novo',
      'reader.group': 'Grupo',
      'reader.repeat': 'Repetição',
      'reader.play': 'Reproduzir',
      'reader.pause': 'Pausar',
      'about.title': 'Uma forma mais tranquila de aprender.',
      'about.body': 'O Dictator transforma notas, ensaios, PDFs e material de estudo em fala para você ouvir, repetir e reter mais. Ele foi pensado para estudantes, aprendizes de idiomas e qualquer pessoa que queira ditar anotações para o computador e revisá-las por áudio em um fluxo privado no navegador.',
      'about.section1': 'Pensado para repetição',
      'about.section1p': 'Grupos pequenos, ritmo ajustável e destaque visível da leitura ajudam você a permanecer na frase em vez de correr pela leitura.',
      'about.section2': 'Privado por padrão',
      'about.section2p': 'Seus projetos salvos ficam neste navegador usando armazenamento local e IndexedDB. O Dictator não envia suas notas para um servidor de aplicação.',
      'how.title': 'Como usar o Dictator.',
      'how.body': 'Comece na página inicial, cole uma nota ou carregue um arquivo TXT, PDF ou DOCX e então crie um projeto.',
      'how.build': 'Crie uma sessão',
      'how.step1': 'Adicione seu texto.',
      'how.step2': 'Escolha o tamanho do grupo, repetições, velocidade e idioma nas Configurações.',
      'how.step3': 'Inicie a sessão e siga os grupos destacados.',
      'how.questions': 'Perguntas',
      'how.groupQuestion': 'O que é um grupo?',
      'how.groupAnswer': 'Um grupo é o número de palavras que o Dictator fala antes de avançar.',
      'how.settingsQuestion': 'Posso alterar as configurações durante a leitura?',
      'how.settingsAnswer': 'Sim. Os controles do leitor salvam alterações no projeto atual e ajustam o agrupamento quando necessário.',
      'privacy.title': 'Política de privacidade.',
      'privacy.body': 'O Dictator foi projetado para manter suas notas no seu dispositivo. Os projetos ficam armazenados neste navegador e a fala é produzida pela Web Speech API do navegador.',
      'privacy.whatLeaves': 'O que sai do seu dispositivo?',
      'privacy.whatLeavesBody': 'Nada é enviado para um servidor da aplicação Dictator. Bibliotecas opcionais de PDF, DOCX e detecção de idioma podem ser carregadas por meio de CDNs públicos quando você usa esses recursos.',
      'privacy.removing': 'Removendo seus dados',
      'privacy.removingBody': 'Exclua projetos individuais na página de Projetos ou limpe o armazenamento do site no navegador para remover todos os dados locais.',
    },
    fr: {
      'home.hero.edit': 'Modifier le projet enregistré', 'home.hero.new': 'Écoutez. Répétez. Apprenez.', 'home.h1.edit': 'Mettez vos notes à jour.', 'home.h1.new': 'Dictez vos notes.', 'home.p.edit': 'Enregistrez les changements de cette session d’écoute.', 'home.p.new': 'Transformez vos notes en une session d’écoute ciblée.', 'home.recent': 'Projets récents', 'home.empty': 'Vos sessions enregistrées apparaîtront ici.', 'home.viewAll': 'Voir tous les projets', 'home.placeholder': 'Écrivez ou collez votre texte ici...', 'home.counter': 'mots', 'home.privacy': 'Vos notes restent sur cet appareil.', 'home.save': 'Enregistrer les changements', 'home.start': 'Commencer la dictée', 'home.browse': 'Cliquer pour parcourir', 'home.drop': 'Déposez un fichier ici', 'home.drag': 'ou glissez-déposez', 'home.fileType': 'TXT, PDF ou DOCX',
      'project.yourLibrary': 'Votre bibliothèque', 'project.title': 'Vos projets.', 'project.subtitle': 'Gérez vos sessions d’écoute. 20 projets maximum.', 'project.new': '+ Nouveau projet', 'project.demoInfo': 'Projet de test intégré · {count} groupes · Ne compte pas dans la limite de 20 projets', 'project.openDemo': 'Ouvrir la démo', 'project.open': 'Ouvrir', 'project.rename': 'Renommer', 'project.delete': 'Supprimer', 'project.emptyTitle': 'Aucun projet pour le moment.', 'project.emptyText': 'Commencez par une note depuis la page d’accueil.', 'project.emptyAction': 'Créer votre premier projet', 'project.storageUsed': '{count} projets utilisés sur 20', 'project.deleteConfirm': 'Supprimer ce projet ? Cette action est irréversible.', 'project.renamed': 'Projet renommé.', 'project.deleted': 'Projet supprimé.', 'project.saved': 'Projet mis à jour.', 'project.created': 'Projet créé.', 'project.fileLoaded': '{file} chargé.', 'project.loadFail': 'Impossible d’enregistrer le projet.', 'project.storageFull': 'Stockage plein (20/20 projets).',
      'reader.back': '← Retour aux projets', 'reader.demo': 'Projet de test intégré', 'reader.view': 'Mode lecture', 'reader.edit': 'Modifier le texte', 'reader.words': 'Mots', 'reader.reps': 'Répétitions', 'reader.lang': 'Langue', 'reader.restart': 'Recommencer', 'reader.speed': 'Vitesse', 'reader.loading': 'Chargement de la voix du navigateur', 'reader.finished': 'Terminé · appuyez sur Recommencer pour recommencer', 'reader.group': 'Groupe', 'reader.repeat': 'Répétition', 'reader.play': 'Lire', 'reader.pause': 'Pause',
      'about.title': 'Une façon plus sereine d’apprendre.', 'about.body': 'Dictator transforme vos notes, essais et supports d’étude en une pratique d’écoute réfléchie. Tout fonctionne dans votre navigateur, vos projets restent donc les vôtres.', 'about.section1': 'Conçu pour la répétition', 'about.section1p': 'Des groupes courts, un rythme réglable et un surlignage visible vous aident à rester dans la phrase au lieu de la parcourir trop vite.', 'about.section2': 'Privé par défaut', 'about.section2p': 'Vos projets sont enregistrés dans ce navigateur avec le stockage local et IndexedDB. Dictator n’envoie pas vos notes à un serveur applicatif.',
      'how.title': 'Comment utiliser Dictator.', 'how.body': 'Depuis l’accueil, collez une note ou chargez un fichier TXT, PDF ou DOCX, puis créez un projet.', 'how.build': 'Créer une session', 'how.step1': 'Ajoutez votre texte.', 'how.step2': 'Choisissez dans les paramètres la taille des groupes, les répétitions, la vitesse et la langue.', 'how.step3': 'Démarrez la session et suivez les groupes surlignés.', 'how.questions': 'Questions', 'how.groupQuestion': 'Que signifie un groupe ?', 'how.groupAnswer': 'Un groupe correspond au nombre de mots que Dictator prononce avant de passer à la suite.', 'how.settingsQuestion': 'Puis-je modifier les paramètres pendant la lecture ?', 'how.settingsAnswer': 'Oui. Les commandes du lecteur enregistrent les changements du projet actuel et réinitialisent les groupes si nécessaire.',
      'privacy.title': 'Politique de confidentialité.', 'privacy.body': 'Dictator est conçu pour conserver vos notes sur votre appareil. Les projets sont stockés dans ce navigateur et la parole est produite par l’API Web Speech du navigateur.', 'privacy.whatLeaves': 'Qu’est-ce qui quitte votre appareil ?', 'privacy.whatLeavesBody': 'Rien n’est envoyé à un serveur applicatif Dictator. Des bibliothèques facultatives pour les PDF, DOCX et la détection de langue peuvent être chargées depuis des CDN publics lorsque vous utilisez ces fonctions.', 'privacy.removing': 'Supprimer vos données', 'privacy.removingBody': 'Supprimez des projets individuels depuis la page Projets ou effacez le stockage du site dans le navigateur pour supprimer toutes les données locales.'
    },
    es: {
      'home.hero.edit': 'Editar proyecto guardado', 'home.hero.new': 'Escucha. Repite. Aprende.', 'home.h1.edit': 'Actualiza tus notas.', 'home.h1.new': 'Dicta tus notas.', 'home.p.edit': 'Guarda los cambios de esta sesión de escucha.', 'home.p.new': 'Convierte tus notas en una sesión de escucha enfocada.', 'home.recent': 'Proyectos recientes', 'home.empty': 'Tus sesiones guardadas aparecerán aquí.', 'home.viewAll': 'Ver todos los proyectos', 'home.placeholder': 'Escribe o pega tu texto aquí...', 'home.counter': 'palabras', 'home.privacy': 'Tus notas permanecen en este dispositivo.', 'home.save': 'Guardar cambios', 'home.start': 'Comenzar a dictar', 'home.browse': 'Haz clic para buscar', 'home.drop': 'Suelta un archivo aquí', 'home.drag': 'o arrástralo y suéltalo', 'home.fileType': 'TXT, PDF o DOCX',
      'project.yourLibrary': 'Tu biblioteca', 'project.title': 'Tus proyectos.', 'project.subtitle': 'Gestiona tus sesiones de escucha. Máximo 20 proyectos.', 'project.new': '+ Nuevo proyecto', 'project.demoInfo': 'Proyecto de prueba integrado · {count} grupos · No cuenta para el límite de 20 proyectos', 'project.openDemo': 'Abrir demo', 'project.open': 'Abrir', 'project.rename': 'Cambiar nombre', 'project.delete': 'Eliminar', 'project.emptyTitle': 'Aún no hay proyectos.', 'project.emptyText': 'Empieza con una nota desde la página de inicio.', 'project.emptyAction': 'Crear tu primer proyecto', 'project.storageUsed': '{count} de 20 proyectos usados', 'project.deleteConfirm': '¿Eliminar este proyecto? Esta acción no se puede deshacer.', 'project.renamed': 'Proyecto renombrado.', 'project.deleted': 'Proyecto eliminado.', 'project.saved': 'Proyecto actualizado.', 'project.created': 'Proyecto creado.', 'project.fileLoaded': '{file} cargado.', 'project.loadFail': 'No se pudo guardar el proyecto.', 'project.storageFull': 'Almacenamiento lleno (20/20 proyectos).',
      'reader.back': '← Volver a proyectos', 'reader.demo': 'Proyecto de prueba integrado', 'reader.view': 'Vista de lectura', 'reader.edit': 'Editar texto', 'reader.words': 'Palabras', 'reader.reps': 'Repeticiones', 'reader.lang': 'Idioma', 'reader.restart': 'Reiniciar', 'reader.speed': 'Velocidad', 'reader.loading': 'Cargando la voz del navegador', 'reader.finished': 'Completado · pulsa Reiniciar para comenzar de nuevo', 'reader.group': 'Grupo', 'reader.repeat': 'Repetición', 'reader.play': 'Reproducir', 'reader.pause': 'Pausa',
      'about.title': 'Una forma más tranquila de aprender.', 'about.body': 'Dictator convierte notas, ensayos y material de estudio en una práctica de escucha deliberada. Todo funciona en tu navegador, así que tus proyectos siguen siendo tuyos.', 'about.section1': 'Diseñado para repetir', 'about.section1p': 'Los grupos pequeños, el ritmo ajustable y el resaltado visible te ayudan a seguir la frase en lugar de recorrerla deprisa.', 'about.section2': 'Privado por defecto', 'about.section2p': 'Tus proyectos guardados viven en este navegador mediante almacenamiento local e IndexedDB. Dictator no sube tus notas a un servidor de aplicaciones.',
      'how.title': 'Cómo usar Dictator.', 'how.body': 'Empieza en Inicio, pega una nota o carga un archivo TXT, PDF o DOCX y crea un proyecto.', 'how.build': 'Crear una sesión', 'how.step1': 'Añade tu texto.', 'how.step2': 'Elige en Ajustes el tamaño de los grupos, las repeticiones, la velocidad y el idioma.', 'how.step3': 'Inicia la sesión y sigue los grupos resaltados.', 'how.questions': 'Preguntas', 'how.groupQuestion': '¿Qué significa un grupo?', 'how.groupAnswer': 'Un grupo es el número de palabras que Dictator pronuncia antes de avanzar.', 'how.settingsQuestion': '¿Puedo cambiar los ajustes mientras leo?', 'how.settingsAnswer': 'Sí. Los controles del lector guardan los cambios del proyecto actual y reinician los grupos cuando es necesario.',
      'privacy.title': 'Política de privacidad.', 'privacy.body': 'Dictator está diseñado para mantener tus notas en tu dispositivo. Los proyectos se almacenan en este navegador y la voz la produce la API Web Speech del navegador.', 'privacy.whatLeaves': '¿Qué sale de tu dispositivo?', 'privacy.whatLeavesBody': 'No se envía nada a un servidor de aplicaciones de Dictator. Las bibliotecas opcionales para PDF, DOCX y detección de idioma pueden cargarse desde CDN públicos cuando usas esas funciones.', 'privacy.removing': 'Eliminar tus datos', 'privacy.removingBody': 'Elimina proyectos individuales desde la página Proyectos o borra el almacenamiento de este sitio en el navegador para eliminar todos los datos locales.'
    },
    de: {
      'home.hero.edit': 'Gespeichertes Projekt bearbeiten', 'home.hero.new': 'Hören. Wiederholen. Lernen.', 'home.h1.edit': 'Notizen aktualisieren.', 'home.h1.new': 'Diktiere deine Notizen.', 'home.p.edit': 'Änderungen an dieser Hörsitzung speichern.', 'home.p.new': 'Verwandle deine Notizen in eine konzentrierte Hörsitzung.', 'home.recent': 'Letzte Projekte', 'home.empty': 'Gespeicherte Sitzungen erscheinen hier.', 'home.viewAll': 'Alle Projekte anzeigen', 'home.placeholder': 'Text hier schreiben oder einfügen...', 'home.counter': 'Wörter', 'home.privacy': 'Deine Notizen bleiben auf diesem Gerät.', 'home.save': 'Änderungen speichern', 'home.start': 'Diktat starten', 'home.browse': 'Zum Durchsuchen klicken', 'home.drop': 'Datei hier ablegen', 'home.drag': 'oder per Drag-and-drop', 'home.fileType': 'TXT, PDF oder DOCX',
      'project.yourLibrary': 'Deine Bibliothek', 'project.title': 'Deine Projekte.', 'project.subtitle': 'Verwalte deine Hörsitzungen. Maximal 20 Projekte.', 'project.new': '+ Neues Projekt', 'project.demoInfo': 'Integriertes Testprojekt · {count} Gruppen · Wird nicht auf das Limit von 20 Projekten angerechnet', 'project.openDemo': 'Demo öffnen', 'project.open': 'Öffnen', 'project.rename': 'Umbenennen', 'project.delete': 'Löschen', 'project.emptyTitle': 'Noch keine Projekte.', 'project.emptyText': 'Beginne mit einer Notiz auf der Startseite.', 'project.emptyAction': 'Erstes Projekt erstellen', 'project.storageUsed': '{count} von 20 Projekten verwendet', 'project.deleteConfirm': 'Dieses Projekt löschen? Dies kann nicht rückgängig gemacht werden.', 'project.renamed': 'Projekt umbenannt.', 'project.deleted': 'Projekt gelöscht.', 'project.saved': 'Projekt aktualisiert.', 'project.created': 'Projekt erstellt.', 'project.fileLoaded': '{file} geladen.', 'project.loadFail': 'Projekt konnte nicht gespeichert werden.', 'project.storageFull': 'Speicher voll (20/20 Projekte).',
      'reader.back': '← Zurück zu den Projekten', 'reader.demo': 'Integriertes Testprojekt', 'reader.view': 'Lesemodus', 'reader.edit': 'Text bearbeiten', 'reader.words': 'Wörter', 'reader.reps': 'Wiederholungen', 'reader.lang': 'Sprache', 'reader.restart': 'Neustart', 'reader.speed': 'Geschwindigkeit', 'reader.loading': 'Browserstimme wird geladen', 'reader.finished': 'Fertig · zum Neustart auf Neustart drücken', 'reader.group': 'Gruppe', 'reader.repeat': 'Wiederholung', 'reader.play': 'Abspielen', 'reader.pause': 'Pause',
      'about.title': 'Ruhiger lernen.', 'about.body': 'Dictator verwandelt Notizen, Aufsätze und Lernmaterial in bewusstes Hörtraining. Alles läuft im Browser, daher bleiben deine Projekte deine eigenen.', 'about.section1': 'Für Wiederholung entwickelt', 'about.section1p': 'Kleine Gruppen, anpassbares Tempo und eine sichtbare Hervorhebung helfen dir, beim Satz zu bleiben, statt ihn zu überfliegen.', 'about.section2': 'Standardmäßig privat', 'about.section2p': 'Deine gespeicherten Projekte liegen über lokalen Speicher und IndexedDB in diesem Browser. Dictator lädt deine Notizen nicht auf einen Anwendungsserver hoch.',
      'how.title': 'So verwendest du Dictator.', 'how.body': 'Beginne auf der Startseite, füge eine Notiz ein oder lade eine TXT-, PDF- oder DOCX-Datei und erstelle dann ein Projekt.', 'how.build': 'Sitzung erstellen', 'how.step1': 'Füge deinen Text hinzu.', 'how.step2': 'Wähle in den Einstellungen Gruppengröße, Wiederholungen, Geschwindigkeit und Sprache.', 'how.step3': 'Starte die Sitzung und folge den hervorgehobenen Gruppen.', 'how.questions': 'Fragen', 'how.groupQuestion': 'Was bedeutet eine Gruppe?', 'how.groupAnswer': 'Eine Gruppe ist die Anzahl der Wörter, die Dictator gemeinsam spricht, bevor es fortfährt.', 'how.settingsQuestion': 'Kann ich die Einstellungen während des Lesens ändern?', 'how.settingsAnswer': 'Ja. Die Lesesteuerung speichert Änderungen am aktuellen Projekt und setzt die Gruppierung bei Bedarf zurück.',
      'privacy.title': 'Datenschutzerklärung.', 'privacy.body': 'Dictator wurde entwickelt, damit deine Notizen auf deinem Gerät bleiben. Projekte werden in diesem Browser gespeichert und die Sprache wird von der Web-Speech-API des Browsers erzeugt.', 'privacy.whatLeaves': 'Was verlässt dein Gerät?', 'privacy.whatLeavesBody': 'Nichts wird an einen Dictator-Anwendungsserver gesendet. Optionale PDF-, DOCX- und Spracherkennungsbibliotheken können bei ihrer Verwendung von öffentlichen CDNs geladen werden.', 'privacy.removing': 'Daten entfernen', 'privacy.removingBody': 'Lösche einzelne Projekte auf der Projektseite oder lösche den Browserspeicher dieser Website, um alle lokalen Daten zu entfernen.'
    },
    it: {
      'home.hero.edit': 'Modifica progetto salvato', 'home.hero.new': 'Ascolta. Ripeti. Impara.', 'home.h1.edit': 'Aggiorna i tuoi appunti.', 'home.h1.new': 'Detta i tuoi appunti.', 'home.p.edit': 'Salva le modifiche a questa sessione di ascolto.', 'home.p.new': 'Trasforma i tuoi appunti in una sessione di ascolto mirata.', 'home.recent': 'Progetti recenti', 'home.empty': 'Le sessioni salvate appariranno qui.', 'home.viewAll': 'Visualizza tutti i progetti', 'home.placeholder': 'Scrivi o incolla qui il testo...', 'home.counter': 'parole', 'home.privacy': 'I tuoi appunti restano su questo dispositivo.', 'home.save': 'Salva modifiche', 'home.start': 'Inizia a dettare', 'home.browse': 'Fai clic per sfogliare', 'home.drop': 'Trascina qui un file', 'home.drag': 'oppure trascinalo e rilascialo', 'home.fileType': 'TXT, PDF o DOCX',
      'project.yourLibrary': 'La tua raccolta', 'project.title': 'I tuoi progetti.', 'project.subtitle': 'Gestisci le tue sessioni di ascolto. Massimo 20 progetti.', 'project.new': '+ Nuovo progetto', 'project.demoInfo': 'Progetto di prova integrato · {count} gruppi · Non conta per il limite di 20 progetti', 'project.openDemo': 'Apri demo', 'project.open': 'Apri', 'project.rename': 'Rinomina', 'project.delete': 'Elimina', 'project.emptyTitle': 'Ancora nessun progetto.', 'project.emptyText': 'Inizia con una nota dalla pagina Home.', 'project.emptyAction': 'Crea il tuo primo progetto', 'project.storageUsed': '{count} progetti usati su 20', 'project.deleteConfirm': 'Eliminare questo progetto? Non è possibile annullare l’operazione.', 'project.renamed': 'Progetto rinominato.', 'project.deleted': 'Progetto eliminato.', 'project.saved': 'Progetto aggiornato.', 'project.created': 'Progetto creato.', 'project.fileLoaded': '{file} caricato.', 'project.loadFail': 'Impossibile salvare il progetto.', 'project.storageFull': 'Spazio esaurito (20/20 progetti).',
      'reader.back': '← Torna ai progetti', 'reader.demo': 'Progetto di prova integrato', 'reader.view': 'Vista lettura', 'reader.edit': 'Modifica testo', 'reader.words': 'Parole', 'reader.reps': 'Ripetizioni', 'reader.lang': 'Lingua', 'reader.restart': 'Riavvia', 'reader.speed': 'Velocità', 'reader.loading': 'Caricamento della voce del browser', 'reader.finished': 'Completato · premi Riavvia per ricominciare', 'reader.group': 'Gruppo', 'reader.repeat': 'Ripetizione', 'reader.play': 'Riproduci', 'reader.pause': 'Pausa',
      'about.title': 'Un modo più sereno di imparare.', 'about.body': 'Dictator trasforma appunti, saggi e materiale di studio in una pratica di ascolto intenzionale. Tutto funziona nel browser, quindi i tuoi progetti restano tuoi.', 'about.section1': 'Progettato per la ripetizione', 'about.section1p': 'Gruppi brevi, ritmo regolabile ed evidenziazione visibile ti aiutano a seguire la frase invece di scorrerla velocemente.', 'about.section2': 'Privato per impostazione predefinita', 'about.section2p': 'I tuoi progetti salvati risiedono in questo browser tramite memoria locale e IndexedDB. Dictator non carica i tuoi appunti su un server applicativo.',
      'how.title': 'Come usare Dictator.', 'how.body': 'Inizia da Home, incolla una nota o carica un file TXT, PDF o DOCX, quindi crea un progetto.', 'how.build': 'Crea una sessione', 'how.step1': 'Aggiungi il testo.', 'how.step2': 'Scegli nelle Impostazioni la dimensione dei gruppi, le ripetizioni, la velocità e la lingua.', 'how.step3': 'Avvia la sessione e segui i gruppi evidenziati.', 'how.questions': 'Domande', 'how.groupQuestion': 'Che cosa significa gruppo?', 'how.groupAnswer': 'Un gruppo è il numero di parole che Dictator pronuncia insieme prima di continuare.', 'how.settingsQuestion': 'Posso cambiare le impostazioni durante la lettura?', 'how.settingsAnswer': 'Sì. I controlli del lettore salvano le modifiche al progetto corrente e reimpostano i gruppi quando necessario.',
      'privacy.title': 'Informativa sulla privacy.', 'privacy.body': 'Dictator è progettato per conservare i tuoi appunti sul dispositivo. I progetti vengono salvati in questo browser e la voce è prodotta dall’API Web Speech del browser.', 'privacy.whatLeaves': 'Che cosa lascia il dispositivo?', 'privacy.whatLeavesBody': 'Nessun dato viene inviato a un server applicativo Dictator. Le librerie opzionali per PDF, DOCX e rilevamento della lingua possono essere caricate da CDN pubblici quando usi queste funzioni.', 'privacy.removing': 'Rimuovere i dati', 'privacy.removingBody': 'Elimina i singoli progetti dalla pagina Progetti oppure cancella la memoria del sito nel browser per rimuovere tutti i dati locali.'
    },
    ru: {
      'home.hero.edit': 'Изменить сохранённый проект', 'home.hero.new': 'Слушайте. Повторяйте. Учитесь.', 'home.h1.edit': 'Обновите свои заметки.', 'home.h1.new': 'Диктуйте свои заметки.', 'home.p.edit': 'Сохраните изменения этой учебной сессии.', 'home.p.new': 'Превратите заметки в сосредоточенную сессию прослушивания.', 'home.recent': 'Недавние проекты', 'home.empty': 'Сохранённые сессии появятся здесь.', 'home.viewAll': 'Показать все проекты', 'home.placeholder': 'Напишите или вставьте текст здесь...', 'home.counter': 'слов', 'home.privacy': 'Ваши заметки остаются на этом устройстве.', 'home.save': 'Сохранить изменения', 'home.start': 'Начать диктовку', 'home.browse': 'Нажмите для выбора', 'home.drop': 'Перетащите файл сюда', 'home.drag': 'или перетащите его', 'home.fileType': 'TXT, PDF или DOCX',
      'project.yourLibrary': 'Ваша библиотека', 'project.title': 'Ваши проекты.', 'project.subtitle': 'Управляйте сессиями прослушивания. Максимум 20 проектов.', 'project.new': '+ Новый проект', 'project.demoInfo': 'Встроенный тестовый проект · групп: {count} · Не учитывается в лимите 20 проектов', 'project.openDemo': 'Открыть демо', 'project.open': 'Открыть', 'project.rename': 'Переименовать', 'project.delete': 'Удалить', 'project.emptyTitle': 'Проектов пока нет.', 'project.emptyText': 'Начните с заметки на главной странице.', 'project.emptyAction': 'Создать первый проект', 'project.storageUsed': 'Использовано проектов: {count} из 20', 'project.deleteConfirm': 'Удалить этот проект? Это действие нельзя отменить.', 'project.renamed': 'Проект переименован.', 'project.deleted': 'Проект удалён.', 'project.saved': 'Проект обновлён.', 'project.created': 'Проект создан.', 'project.fileLoaded': '{file} загружен.', 'project.loadFail': 'Не удалось сохранить проект.', 'project.storageFull': 'Хранилище заполнено (20/20 проектов).',
      'reader.back': '← Назад к проектам', 'reader.demo': 'Встроенный тестовый проект', 'reader.view': 'Режим чтения', 'reader.edit': 'Изменить текст', 'reader.words': 'Слова', 'reader.reps': 'Повторы', 'reader.lang': 'Язык', 'reader.restart': 'Начать заново', 'reader.speed': 'Скорость', 'reader.loading': 'Загрузка голоса браузера', 'reader.finished': 'Готово · нажмите «Начать заново», чтобы повторить', 'reader.group': 'Группа', 'reader.repeat': 'Повтор', 'reader.play': 'Воспроизвести', 'reader.pause': 'Пауза',
      'about.title': 'Более спокойный способ учиться.', 'about.body': 'Dictator превращает заметки, эссе и учебные материалы в осознанную практику слушания. Всё работает в браузере, поэтому ваши проекты остаются вашими.', 'about.section1': 'Создано для повторения', 'about.section1p': 'Небольшие группы, регулируемый темп и видимая подсветка чтения помогают сосредоточиться на предложении, а не пролистывать его.', 'about.section2': 'Конфиденциальность по умолчанию', 'about.section2p': 'Сохранённые проекты находятся в этом браузере, в локальном хранилище и IndexedDB. Dictator не загружает ваши заметки на сервер приложения.',
      'how.title': 'Как пользоваться Dictator.', 'how.body': 'Начните на главной странице, вставьте заметку или загрузите файл TXT, PDF или DOCX, затем создайте проект.', 'how.build': 'Создать сессию', 'how.step1': 'Добавьте текст.', 'how.step2': 'Выберите в настройках размер группы, количество повторов, скорость и язык.', 'how.step3': 'Начните сессию и следите за подсвеченными группами.', 'how.questions': 'Вопросы', 'how.groupQuestion': 'Что такое группа?', 'how.groupAnswer': 'Группа — это количество слов, которые Dictator произносит вместе перед переходом дальше.', 'how.settingsQuestion': 'Можно ли менять настройки во время чтения?', 'how.settingsAnswer': 'Да. Элементы управления чтением сохраняют изменения текущего проекта и при необходимости сбрасывают группировку.',
      'privacy.title': 'Политика конфиденциальности.', 'privacy.body': 'Dictator создан, чтобы ваши заметки оставались на устройстве. Проекты хранятся в этом браузере, а речь создаётся с помощью браузерного API Web Speech.', 'privacy.whatLeaves': 'Что покидает ваше устройство?', 'privacy.whatLeavesBody': 'Ничего не отправляется на сервер приложения Dictator. Дополнительные библиотеки для PDF, DOCX и определения языка могут загружаться из общедоступных CDN при использовании этих функций.', 'privacy.removing': 'Удаление данных', 'privacy.removingBody': 'Удаляйте отдельные проекты на странице проектов или очистите хранилище этого сайта в браузере, чтобы удалить все локальные данные.'
    },
  };

  function getUiLanguage() {
    try {
      const settings = JSON.parse(localStorage.getItem('dictator_settings') || '{}');
      return window.DictatorI18n?.resolveUiLanguage ? window.DictatorI18n.resolveUiLanguage(settings.uiLanguage || 'auto') : 'en';
    } catch {
      return 'en';
    }
  }

  function t(key, fallback = key) {
    const language = getUiLanguage();
    const table = UI_TEXT[language] || UI_TEXT.en;
    return table[key] || UI_TEXT.en[key] || fallback;
  }

  function formatText(key, values = {}) {
    const text = t(key, key);
    return text.replace(/\{(\w+)\}/g, (_, token) => String(values[token] ?? ''));
  }

  const app = () => document.querySelector('#app');
  const safe = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[char]));
  const settings = () => { try { return { defaultDictationLang:'auto', defaultWordsPerGroup:6, defaultRepetitions:2, defaultSpeed:.9, defaultPauseDuration:.8, ...JSON.parse(localStorage.getItem('dictator_settings') || '{}') }; } catch { return { defaultDictationLang:'auto', defaultWordsPerGroup:6, defaultRepetitions:2, defaultSpeed:.9, defaultPauseDuration:.8 }; } };

  let currentProjectImageData = null;
  let activeInputSource = { type:'paste', name:null };
  function demoProject() {
    const demoText = {
      en: `# The Clockmaker's Last Light

## Chapter 1: A Door at Midnight

At 11:59 p.m., Mira heard three knocks: "tap, tap, tap!" She froze; the old clock had stopped.

Beyond the workshop door, rain, wind, and silver leaves raced down the street. A voice whispered, "Mira... are you there?"

She lifted the brass key (the one marked "VII"), turned it twice, and stepped outside. No one was there--only a blue envelope, a broken compass, and a note: "Do not follow the stars."

## Chapter 2: The Impossible Map

Inside the envelope, she found a map covered in arrows, circles, and strange symbols: @, #, %, &, +, =. At the bottom someone had written, "North is not north; midnight is not the end."

Mira checked the time: 12:07. Then 12:08. Then 12:08 again! The compass needle spun; the workshop lights blinked on and off, on and off.

"This makes no sense," she said. "Unless..." A tiny gear fell from the ceiling and landed beside her boot. It was warm--almost alive.

## Chapter 3: The Listening Machine

She placed the gear in the clock. Click. Clack. The machine opened a hidden panel and revealed seven glass letters: A, B, C, D, E, F, G.

Each letter spoke a different word: "begin," "remember," "return," "listen," "choose," "wait," "wake." Mira wrote them down, carefully; punctuation mattered.

At precisely 12:12:12, the clock chimed once. The door vanished. In its place appeared a staircase descending into warm golden light...

Mira took one breath, then another. "All right," she said, "let's find out what the clock remembers." And down she went.`,
  pt: `# A Última Luz do Relojoeiro

## Capítulo 1: Uma Porta à Meia-noite

Às 23h59, Mira ouviu três batidas: "toc, toc, toc!" Ela congelou; o relógio antigo havia parado.

Além da porta da oficina, chuva, vento e folhas prateadas corriam pela rua. Uma voz sussurrou: "Mira... você está aí?"

Ela levantou a chave de latão (a marcada com "VII"), girou-a duas vezes e saiu. Não havia ninguém, apenas um envelope azul, uma bússola quebrada e um bilhete: "Não siga as estrelas."

## Capítulo 2: O Mapa Impossível

Dentro do envelope, encontrou um mapa coberto de setas, círculos e símbolos estranhos: @, #, %, &, +, =. No final, alguém escrevera: "O norte não é o norte; a meia-noite não é o fim."

Mira conferiu a hora: 12h07. Depois 12h08. Depois 12h08 novamente! A agulha da bússola girou; as luzes da oficina piscaram, acendendo e apagando.

"Isso não faz sentido", disse ela. "A menos que..." Uma pequena engrenagem caiu do teto e pousou ao lado de sua bota. Estava quente, quase viva.

## Capítulo 3: A Máquina de Escuta

Ela colocou a engrenagem no relógio. Clique. Clac. A máquina abriu um painel oculto e revelou sete letras de vidro: A, B, C, D, E, F, G.

Cada letra disse uma palavra diferente: "começar", "lembrar", "retornar", "escutar", "escolher", "esperar", "acordar". Mira anotou tudo com cuidado; a pontuação importava.

Exatamente às 12h12min12s, o relógio tocou uma vez. A porta desapareceu. Em seu lugar surgiu uma escada que descia para uma luz dourada e quente...

Mira respirou fundo uma vez, depois outra. "Tudo bem", disse. "Vamos descobrir o que o relógio lembra." E desceu.`,
  fr: `# La dernière lumière de l'horloger

## Chapitre 1 : Une porte à minuit

À 23 h 59, Mira entendit trois coups : "toc, toc, toc !" Elle se figea ; la vieille horloge s'était arrêtée.

Au-delà de la porte de l'atelier, la pluie, le vent et les feuilles argentées dévalaient la rue. Une voix murmura : "Mira... es-tu là ?"

Elle souleva la clé en laiton (celle marquée "VII"), la tourna deux fois et sortit. Il n'y avait personne, seulement une enveloppe bleue, une boussole cassée et un mot : "Ne suis pas les étoiles."

## Chapitre 2 : La carte impossible

Dans l'enveloppe, elle trouva une carte couverte de flèches, de cercles et de symboles étranges : @, #, %, &, +, =. En bas, quelqu'un avait écrit : "Le nord n'est pas le nord ; minuit n'est pas la fin."

Mira regarda l'heure : 12 h 07. Puis 12 h 08. Puis encore 12 h 08 ! L'aiguille de la boussole tournait ; les lumières de l'atelier clignotaient.

"Cela n'a aucun sens", dit-elle. "À moins que..." Une petite roue dentée tomba du plafond près de sa botte. Elle était chaude, presque vivante.

## Chapitre 3 : La machine d'écoute

Elle plaça la roue dans l'horloge. Clic. Clac. La machine ouvrit un panneau secret et révéla sept lettres de verre : A, B, C, D, E, F, G.

Chaque lettre prononça un mot différent : "commencer", "se souvenir", "revenir", "écouter", "choisir", "attendre", "s'éveiller". Mira les nota soigneusement ; la ponctuation comptait.

À 12 h 12 min 12 s exactement, l'horloge sonna une fois. La porte disparut. À sa place apparut un escalier descendant vers une lumière dorée et chaude...

Mira inspira une fois, puis une autre. "Très bien", dit-elle. "Découvrons ce dont l'horloge se souvient." Et elle descendit.`,
  es: `# La última luz del relojero

## Capítulo 1: Una puerta a medianoche

A las 23:59, Mira oyó tres golpes: "¡toc, toc, toc!" Se quedó inmóvil; el viejo reloj se había detenido.

Más allá de la puerta del taller, la lluvia, el viento y las hojas plateadas corrían por la calle. Una voz susurró: "Mira... ¿estás ahí?"

Levantó la llave de latón (la marcada con "VII"), la giró dos veces y salió. No había nadie, solo un sobre azul, una brújula rota y una nota: "No sigas las estrellas."

## Capítulo 2: El mapa imposible

Dentro del sobre encontró un mapa cubierto de flechas, círculos y símbolos extraños: @, #, %, &, +, =. Abajo alguien había escrito: "El norte no es el norte; la medianoche no es el final."

Mira miró la hora: 12:07. Después 12:08. ¡Después 12:08 otra vez! La aguja de la brújula giró; las luces del taller parpadearon.

"Esto no tiene sentido", dijo. "A menos que..." Un pequeño engranaje cayó del techo junto a su bota. Estaba caliente, casi vivo.

## Capítulo 3: La máquina de escucha

Colocó el engranaje en el reloj. Clic. Clac. La máquina abrió un panel oculto y reveló siete letras de cristal: A, B, C, D, E, F, G.

Cada letra dijo una palabra distinta: "empezar", "recordar", "volver", "escuchar", "elegir", "esperar", "despertar". Mira las anotó con cuidado; la puntuación importaba.

Exactamente a las 12:12:12, el reloj sonó una vez. La puerta desapareció. En su lugar apareció una escalera que descendía hacia una luz dorada y cálida...

Mira respiró una vez y luego otra. "De acuerdo", dijo. "Averigüemos qué recuerda el reloj." Y bajó.`,
  de: `# Das letzte Licht des Uhrmachers

## Kapitel 1: Eine Tür um Mitternacht

Um 23:59 Uhr hörte Mira drei Schläge: "Klopf, klopf, klopf!" Sie erstarrte; die alte Uhr war stehen geblieben.

Hinter der Werkstatttür jagten Regen, Wind und silberne Blätter die Straße entlang. Eine Stimme flüsterte: "Mira ... bist du da?"

Sie hob den Messingschlüssel (den mit der Aufschrift "VII"), drehte ihn zweimal und trat hinaus. Niemand war da, nur ein blauer Umschlag, ein zerbrochener Kompass und eine Notiz: "Folge nicht den Sternen."

## Kapitel 2: Die unmögliche Karte

Im Umschlag fand sie eine Karte voller Pfeile, Kreise und seltsamer Zeichen: @, #, %, &, +, =. Unten stand: "Norden ist nicht Norden; Mitternacht ist nicht das Ende."

Mira sah auf die Uhr: 12:07. Dann 12:08. Dann wieder 12:08! Die Kompassnadel drehte sich; die Werkstattlichter blinkten.

"Das ergibt keinen Sinn", sagte sie. "Außer ..." Ein kleines Zahnrad fiel von der Decke neben ihren Stiefel. Es war warm, fast lebendig.

## Kapitel 3: Die Hörmaschine

Sie setzte das Zahnrad in die Uhr. Klick. Klack. Die Maschine öffnete eine verborgene Klappe und enthüllte sieben gläserne Buchstaben: A, B, C, D, E, F, G.

Jeder Buchstabe sprach ein anderes Wort: "beginnen", "erinnern", "zurückkehren", "zuhören", "wählen", "warten", "aufwachen". Mira schrieb sie sorgfältig auf; die Zeichensetzung war wichtig.

Genau um 12:12:12 Uhr schlug die Uhr einmal. Die Tür verschwand. An ihrer Stelle erschien eine Treppe, die in warmes goldenes Licht hinabführte ...

Mira holte einmal tief Luft, dann noch einmal. "Also gut", sagte sie. "Finden wir heraus, woran sich die Uhr erinnert." Und sie stieg hinab.`,
  it: `# L'ultima luce dell'orologiaio

## Capitolo 1: Una porta a mezzanotte

Alle 23:59 Mira sentì tre colpi: "toc, toc, toc!" Rimase immobile; il vecchio orologio si era fermato.

Oltre la porta della bottega, pioggia, vento e foglie d'argento correvano lungo la strada. Una voce sussurrò: "Mira... ci sei?"

Sollevò la chiave d'ottone (quella con scritto "VII"), la girò due volte e uscì. Non c'era nessuno, solo una busta blu, una bussola rotta e un biglietto: "Non seguire le stelle."

## Capitolo 2: La mappa impossibile

Nella busta trovò una mappa coperta di frecce, cerchi e simboli strani: @, #, %, &, +, =. In fondo qualcuno aveva scritto: "Il nord non è il nord; la mezzanotte non è la fine."

Mira controllò l'ora: 12:07. Poi 12:08. Poi ancora 12:08! L'ago della bussola girava; le luci della bottega lampeggiavano.

"Non ha senso", disse. "A meno che..." Un piccolo ingranaggio cadde dal soffitto accanto al suo stivale. Era caldo, quasi vivo.

## Capitolo 3: La macchina d'ascolto

Mise l'ingranaggio nell'orologio. Clic. Clac. La macchina aprì un pannello nascosto e rivelò sette lettere di vetro: A, B, C, D, E, F, G.

Ogni lettera pronunciò una parola diversa: "iniziare", "ricordare", "tornare", "ascoltare", "scegliere", "aspettare", "svegliarsi". Mira le annotò con cura; la punteggiatura contava.

Esattamente alle 12:12:12 l'orologio suonò una volta. La porta scomparve. Al suo posto apparve una scala che scendeva verso una luce dorata e calda...

Mira fece un respiro, poi un altro. "Va bene", disse. "Scopriamo cosa ricorda l'orologio." E scese.`,
  ru: `# Последний свет часовщика

## Глава 1: Дверь в полночь

В 23:59 Мира услышала три стука: «тук, тук, тук!» Она замерла: старые часы остановились.

За дверью мастерской дождь, ветер и серебряные листья мчались по улице. Голос прошептал: «Мира... ты здесь?»

Она подняла латунный ключ с отметкой «VII», дважды повернула его и вышла. Никого не было, только синий конверт, сломанный компас и записка: «Не следуй за звёздами».

## Глава 2: Невозможная карта

В конверте лежала карта со стрелками, кругами и странными символами: @, #, %, &, +, =. Внизу было написано: «Север — не север; полночь — не конец».

Мира посмотрела на часы: 12:07. Потом 12:08. Потом снова 12:08! Стрелка компаса закрутилась, а огни мастерской замигали.

«В этом нет смысла», сказала она. «Если только...» Маленькая шестерёнка упала с потолка к её сапогу. Она была тёплой, почти живой.

## Глава 3: Машина для слушания

Она вставила шестерёнку в часы. Клик. Клак. Машина открыла скрытую панель и показала семь стеклянных букв: A, B, C, D, E, F, G.

Каждая буква произнесла своё слово: «начать», «помнить», «вернуться», «слушать», «выбрать», «ждать», «проснуться». Мира тщательно записала их: знаки препинания имели значение.

Ровно в 12:12:12 часы пробили один раз. Дверь исчезла. На её месте появилась лестница, ведущая вниз, к тёплому золотому свету...

Мира вдохнула один раз, потом ещё. «Хорошо», сказала она. «Давайте узнаем, что помнят часы». И спустилась.`
    };
    const language = getUiLanguage();
    const rawText = demoText[language] || demoText.en;
    const title = { en:"Demo: The Clockmaker's Last Light", pt:'Demo: A Última Luz do Relojoeiro', fr:"Démo : La dernière lumière de l'horloger", es:'Demo: La última luz del relojero', de:'Demo: Das letzte Licht des Uhrmachers', it:"Demo: L'ultima luce dell'orologiaio", ru:'Демо: Последний свет часовщика' }[language] || demoText.en;
    const sourceName = { en:'Built-in punctuation stress test', pt:'Teste integrado de pontuação', fr:'Test intégré de ponctuation', es:'Prueba integrada de puntuación', de:'Integrierter Zeichensetzungstest', it:'Test integrato di punteggiatura', ru:'Встроенный тест пунктуации' }[language] || 'Built-in punctuation stress test';
    const tokens = tokenize(rawText);
    const structure = detectStructure(rawText.split(/\r?\n/));
    return { id:'demo-stress-project', name:title, nameLower:title.toLowerCase(), rawText, wordCount:tokens.length, structure, tokens, groups:createGroups(tokens, 6, structure), sourceType:'demo', sourceName, progress:{ currentGroupIndex:0, currentRepeat:1, isPlaying:false, lastWordSpoken:'' }, config:{ wordsPerGroup:6, repetitions:2, speed:.9, language:language === 'auto' ? 'en' : language, theme:document.documentElement.dataset.theme }, isDemo:true, createdAt:0, updatedAt:0 };
  }
  function toast(message, type = 'info') { const node = document.createElement('div'); node.className = `toast ${type}`; node.textContent = message; document.querySelector('#toast-region').append(node); setTimeout(() => node.remove(), 3500); }
  function countText(input, counter, start) { const count = input.value.trim() ? input.value.trim().split(/\s+/).length : 0; counter.textContent = `${count.toLocaleString()} ${t('home.counter','words')}`; counter.className = 'counter'; start.disabled = !count; return count; }
  function sourceMarkup() { return `<label class="file-action" id="browse" for="file-input"><span class="file-icon">□</span><span>${t('home.browse','Click to browse')}</span><small>${t('home.fileType','TXT, PDF, or DOCX')}</small></label><label class="file-action" id="drop-label"><span class="file-icon">↓</span><span>${t('home.drop','Drop a file here')}</span><small>${t('home.drag','or drag and drop')}</small></label><input id="file-input" type="file" accept=".txt,.TXT,.pdf,.PDF,.docx,.DOCX,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" hidden>`; }
  async function loadFile(file, input, source) { if (!file) return; const extension = String(file.name || '').split('.').pop().toLowerCase(); try { let result; if (extension === 'txt' || file.type === 'text/plain') result = await extractTXT(file); else if (extension === 'pdf' || file.type === 'application/pdf') result = await extractPDF(await file.arrayBuffer()); else if (extension === 'docx' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') result = await extractDOCX(await file.arrayBuffer()); else throw new Error(`Unsupported file type: ${file.name || 'unknown file'}`); const text = String(result?.text || '').replace(/^\uFEFF/, '').trim(); if (!text) throw new Error(`The file "${file.name}" contains no readable text.`); input.value = text; source.type = extension; source.name = file.name; input.dispatchEvent(new Event('input', { bubbles:true })); toast(formatText('project.fileLoaded', { file: file.name }), 'success'); } catch (error) { toast(error.message || 'Could not read that file.', 'danger'); } }
  async function renderHome(editId = null) {
    const projects = await listProjects(5); const editingProject = editId ? await getProject(editId) : null;
    if (editId && !editingProject) return Router.navigate('projects');
    currentProjectImageData = editingProject?.image || null;
    app().innerHTML = `<div class="page home-page"><div class="hero"><div class="eyebrow">${editingProject ? t('home.hero.edit','Edit saved project') : t('home.hero.new','Listen. Repeat. Learn.')}</div><h1>${editingProject ? t('home.h1.edit','Update your notes.') : t('home.h1.new','Dictate your notes.')}</h1><p>${editingProject ? t('home.p.edit','Save changes to this listening session.') : t('home.p.new','Turn your notes into a focused listening session.')}</p></div><div class="home-grid"><aside class="panel recent-panel"><div class="panel-title"><span>${t('home.recent','Recent projects')}</span><span class="accent-text">${projects.length} / 20</span></div>${projects.length ? projects.map(project => `<button class="mini-project" data-open="${safe(project.id)}"><strong>${safe(project.name)}</strong><small>${t('reader.group','Group')} ${Math.min(project.progress.currentGroupIndex + 1, project.groups.length)} / ${project.groups.length}</small></button>`).join('') : `<p class="empty-note">${t('home.empty','Your saved sessions will appear here.')}</p>`}<button class="button full-button" id="view-projects">${t('home.viewAll','View all projects')}</button></aside><section class="input-section"><div class="input-box" id="input-box"><div class="textarea-wrap"><textarea class="text-input" id="text-input" maxlength="100000" placeholder="${t('home.placeholder','Write or paste your text here...')}"></textarea><div class="counter" id="counter">0 / 5,000 ${t('home.counter','words')}</div></div><div class="file-zone">${sourceMarkup()}</div></div><button class="start-button" id="start" disabled>${editingProject ? t('home.save','Save changes') : t('home.start','Start to dictate')} <span>→</span></button><p class="privacy-note">${t('home.privacy','Your notes stay on this device.')}</p></section></div></div>`;
    bindHome(editingProject);
  }
  function bindHome(editingProject = null) {
    const input = document.querySelector('#text-input'); const counter = document.querySelector('#counter'); const start = document.querySelector('#start'); const box = document.querySelector('#input-box'); const source = { type:'paste', name:null };
    activeInputSource = source;
    input.removeAttribute('maxlength');
    try { const draft = JSON.parse(localStorage.getItem('dictator_draft') || 'null'); if (draft?.content && (!editingProject || draft.editingProjectId === editingProject.id)) input.value = draft.content; else if (editingProject) input.value = editingProject.rawText; } catch { if (editingProject) input.value = editingProject.rawText; }
    const update = () => { const count = countText(input, counter, start); localStorage.setItem('dictator_draft', JSON.stringify({ content: input.value, timestamp: Date.now(), source: source.type, editingProjectId: editingProject?.id || null })); return count; };
    input.addEventListener('input', update); update();
    document.querySelector('#view-projects').onclick = () => Router.navigate('projects');
    document.querySelectorAll('[data-open]').forEach(node => node.onclick = () => Router.navigate(`project/${node.dataset.open}`));
    document.querySelector('#file-input').onchange = event => loadFile(event.target.files[0], input, source);
    ['dragenter','dragover'].forEach(type => box.addEventListener(type, event => { event.preventDefault(); box.classList.add('dragging'); }));
    ['dragleave','drop'].forEach(type => box.addEventListener(type, event => { event.preventDefault(); box.classList.remove('dragging'); }));
    const fileZone = document.querySelector('.file-zone');
    fileZone.addEventListener('dragover', event => { event.preventDefault(); fileZone.classList.add('dragging'); });
    fileZone.addEventListener('dragleave', () => fileZone.classList.remove('dragging'));
    fileZone.addEventListener('drop', event => { event.preventDefault(); fileZone.classList.remove('dragging'); loadFile(event.dataTransfer.files[0], input, source); });
    start.onclick = async () => { const tokens = tokenize(input.value); if (!tokens.length || tokens.length > MAX_WORDS) return; const value = settings(); const language = value.defaultDictationLang === 'auto' ? await detectLanguage(input.value) : value.defaultDictationLang; const structure = detectStructure(input.value.split(/\r?\n/)); const updates = { rawText:input.value, wordCount:tokens.length, structure, tokens, groups:createGroups(tokens, editingProject?.config.wordsPerGroup || Number(value.defaultWordsPerGroup), structure), sourceType:source.type, sourceName:source.name || editingProject?.sourceName || null, image: currentProjectImageData || null, progress:{ currentGroupIndex:0, currentRepeat:1, isPlaying:false, lastWordSpoken:'' } }; try { const project = editingProject ? await updateProject(editingProject.id, updates) : await createProject({ name:tokens.slice(0, 6).join(' '), nameLower:tokens.slice(0, 6).join(' ').toLowerCase(), ...updates, config:{ wordsPerGroup:Number(value.defaultWordsPerGroup), repetitions:Number(value.defaultRepetitions), speed:Number(value.defaultSpeed), pauseDuration:Number(value.defaultPauseDuration) || .8, language, theme:document.documentElement.dataset.theme } }); localStorage.removeItem('dictator_draft'); clearProjectImageSelection(); toast(editingProject ? t('project.saved','Project updated.') : t('project.created','Project created.'), 'success'); Router.navigate(`project/${project.id}`); } catch (error) { toast(error.message === 'STORAGE_FULL' ? t('project.storageFull','Storage full (20/20 projects).') : t('project.loadFail','Could not save project.'), 'danger'); } };
  }
  function projectMeta(project) { const progress = project.groups.length ? Math.round((project.progress.currentGroupIndex / project.groups.length) * 100) : 0; return `${t('reader.group','Group')} ${Math.min(project.progress.currentGroupIndex + 1, project.groups.length)} of ${project.groups.length} · ${progress}% complete · Updated ${new Date(project.updatedAt).toLocaleDateString()}`; }
  async function renderProjects() { const projects = await listProjects(); const demo = demoProject(); app().innerHTML = `<div class="page projects-page"><div class="page-heading"><div><div class="eyebrow">${t('project.yourLibrary','Your library')}</div><h1>${t('project.title','Your projects.')}</h1><p>${t('project.subtitle','Manage your listening sessions. Maximum 20 projects.')}</p></div><button class="button" id="new-project">${t('project.new','+ New project')}</button></div><div class="project-list"><article class="project-card demo-project-card"><div class="project-info"><h3>${safe(demo.name)}</h3><p>${formatText('project.demoInfo', { count: demo.groups.length })}</p></div><div class="card-actions"><button class="button primary" data-open="${demo.id}">${t('project.openDemo','Open demo')}</button></div></article>${projects.length ? projects.map(project => `<article class="project-card"><div class="project-info"><h3>${safe(project.name)}</h3>${project.image ? `<img class="project-image-thumb" src="${safe(project.image)}" alt="Project preview" />` : ''}<p>${projectMeta(project)}${project.sourceName ? ` · ${safe(project.sourceName)}` : ''}</p></div><div class="card-actions"><button class="button primary" data-open="${safe(project.id)}">${t('project.open','Open')}</button><button class="button" data-rename="${safe(project.id)}">${t('project.rename','Rename')}</button><button class="button danger" data-delete="${safe(project.id)}">${t('project.delete','Delete')}</button></div></article>`).join('') : `<div class="empty-state"><h2>${t('project.emptyTitle','No projects yet.')}</h2><p>${t('project.emptyText','Start with a note from the Home page.')}</p><button class="button primary" id="empty-home">${t('project.emptyAction','Create your first project')}</button></div>`}</div><div class="storage"><p>${formatText('project.storageUsed', { count: projects.length })}</p><div class="progress"><span style="width:${projects.length / 20 * 100}%"></span></div></div></div>`;
    document.querySelector('#new-project')?.addEventListener('click', () => Router.navigate('')); document.querySelector('#empty-home')?.addEventListener('click', () => Router.navigate('')); document.querySelectorAll('[data-open]').forEach(node => node.onclick = () => Router.navigate(`project/${node.dataset.open}`));
    document.querySelectorAll('[data-delete]').forEach(node => node.onclick = async () => { if (!confirm(t('project.deleteConfirm','Delete this project? This cannot be undone.'))) return; await deleteProject(node.dataset.delete); toast(t('project.deleted','Project deleted.'), 'success'); renderProjects(); });
    document.querySelectorAll('[data-rename]').forEach(node => node.onclick = async () => { const project = await getProject(node.dataset.rename); const name = prompt('Project name', project.name); if (!name?.trim()) return; await updateProject(project.id, { name:name.trim(), nameLower:name.trim().toLowerCase() }); toast(t('project.renamed','Project renamed.'), 'success'); renderProjects(); });
  }
  function readerContent(project) {
    const paragraphBlocks = splitIntoParagraphs(project.rawText || '');
    const groups = Array.isArray(project.groups) ? project.groups : [];
    if (!paragraphBlocks.length && !groups.length) return '';
    if (!paragraphBlocks.length) {
      return groups.map(group => {
        if (group.hasTitle || group.hasSubtitle) return `<${group.hasTitle ? 'h2' : 'h3'} class="reader-${group.hasTitle ? 'title' : 'subtitle'}">${safe(group.rawText)}</${group.hasTitle ? 'h2' : 'h3'}>`;
        return `<span class="word-group" data-index="${group.index}">${safe(group.rawText)}</span> `;
      }).join('');
    }
    let cursor = 0;
    return paragraphBlocks.map(paragraphText => {
      const paragraphTokens = tokenize(paragraphText);
      const size = Math.max(1, Number(project.config.wordsPerGroup) || 1);
      const expectedCount = Math.max(1, Math.ceil(paragraphTokens.length / size));
      const chunk = groups.slice(cursor, cursor + expectedCount);
      cursor += chunk.length;
      if (!chunk.length) {
        return `<p class="reader-paragraph"><span class="word-group" data-index="0">${safe(paragraphText)}</span></p>`;
      }
      const content = chunk.map(group => {
        if (group.hasTitle || group.hasSubtitle) return `<${group.hasTitle ? 'h2' : 'h3'} class="reader-${group.hasTitle ? 'title' : 'subtitle'}">${safe(group.rawText)}</${group.hasTitle ? 'h2' : 'h3'}>`;
        return `<span class="word-group" data-index="${group.index}">${safe(group.rawText)}</span>`;
      }).join(' ');
      return `<p class="reader-paragraph">${content}</p>`;
    }).join('');
  }
  function speedControl(id, value) { return `<label class="speed-control" for="${id}-range">${t('reader.speed','Speed')} <input id="${id}-range" type="range" min="0.25" max="2" step="0.05" value="${Number(value).toFixed(2)}"><input id="${id}-value" class="speed-value" type="number" min="0.25" max="2" step="0.05" value="${Number(value).toFixed(2)}" aria-label="Speed value"><span>x</span></label>`; }
  function pauseControl(value) { const numeric=Number(value); const current=Math.max(0,Math.min(3.5,Number.isFinite(numeric) ? numeric : .8)).toFixed(1); return `<label class="speed-control" for="reader-pause-range">${t('settings.pause','Pause between groups')} <input id="reader-pause-range" type="range" min="0" max="3.5" step="0.1" value="${current}"><input id="reader-pause-value" class="speed-value" type="number" min="0" max="3.5" step="0.1" value="${current}" aria-label="Pause duration in seconds"><span>s</span></label>`; }
  function bindSpeedControl(id, onChange, minimum = .25, maximum = 2, fallback = 1) { const range = document.querySelector(`#${id}-range`); const value = document.querySelector(`#${id}-value`); if (!range || !value) return; const update = next => { const numeric=Number(next); const clamped = Math.max(minimum, Math.min(maximum, Number.isFinite(numeric) ? numeric : fallback)); range.value = clamped.toFixed(id === 'reader-pause' ? 1 : 2); value.value = clamped.toFixed(id === 'reader-pause' ? 1 : 2); onChange(clamped); }; range.oninput = event => update(event.target.value); value.oninput = event => update(event.target.value); }
  function mountPauseFooter() { const footer=document.querySelector('.dictation-footer'); const active=TTS.get?.(); if (!footer || !active || footer.querySelector('#reader-pause-range')) return; const control=document.createElement('span'); control.innerHTML=pauseControl(active.config.pauseDuration ?? settings().defaultPauseDuration); footer.insertBefore(control.firstElementChild, footer.querySelector('#restart')); bindSpeedControl('reader-pause', value => TTS.configChange('pauseDuration', value), 0, 3.5, .8); }
  function bindReaderGroups(project) { document.querySelectorAll('.word-group').forEach(node => node.onclick = () => TTS.jump(Number(node.dataset.index))); }
  function refreshReader(project) { const reader = document.querySelector('#reader'); if (reader) reader.innerHTML = readerContent(project); bindReaderGroups(project); updateReaderState(project, 'paused'); }
  async function renderProject(id) { const project = id === 'demo-stress-project' ? demoProject() : await getProject(id); if (!project) return Router.navigate(''); TTS.load(project); app().innerHTML = `<div class="reader-page"><div class="reader-header"><button class="back-link" id="back-projects">${t('reader.back','← Back to projects')}</button><div><div class="eyebrow">${project.isDemo ? t('reader.demo','Built-in test project') : t('reader.view','Reader view')}</div><h1>${safe(project.name)}</h1></div>${project.isDemo ? '' : `<button class="button" id="edit-text">${t('reader.edit','Edit text')}</button>`}</div><article class="reader-shell" id="reader">${readerContent(project)}</article></div><div class="dictation-footer"><div class="playback"><button class="icon-button" id="previous" aria-label="Previous group">←</button><button class="play-button" id="play" aria-label="Play">▶</button><button class="icon-button" id="next" aria-label="Next group">→</button></div><label>${t('reader.words','Words')} <select id="reader-words">${Array.from({length:10},(_,i)=>`<option value="${i+1}" ${project.config.wordsPerGroup === i+1 ? 'selected' : ''}>${i+1}</option>`).join('')}</select></label><label>${t('reader.reps','Reps')} <select id="reader-reps">${Array.from({length:10},(_,i)=>`<option value="${i+1}" ${project.config.repetitions === i+1 ? 'selected' : ''}>${i+1}</option>`).join('')}</select></label>${speedControl('reader-speed', project.config.speed)}<label>${t('reader.lang','Lang')} <select id="reader-lang">${['en','pt','es','fr','de','it','ar','ru'].map(value=>`<option value="${value}" ${project.config.language === value ? 'selected' : ''}>${value.toUpperCase()}</option>`).join('')}</select></label><button class="button" id="restart">${t('reader.restart','Restart')}</button><span class="status" id="status"></span></div>`;
    document.querySelector('#back-projects').onclick = () => Router.navigate('projects'); document.querySelector('#edit-text')?.addEventListener('click', () => Router.navigate(`edit/${project.id}`)); document.querySelector('#play').onclick = () => TTS.toggle(); document.querySelector('#previous').onclick = () => TTS.previous(); document.querySelector('#next').onclick = () => TTS.next(); document.querySelector('#restart').onclick = () => TTS.restart(); bindReaderGroups(project); [['reader-words','wordsPerGroup'],['reader-reps','repetitions'],['reader-lang','language']].forEach(([id,key]) => document.querySelector(`#${id}`).onchange = event => TTS.configChange(key, event.target.value)); bindSpeedControl('reader-speed', value => TTS.configChange('speed', value)); bindSpeedControl('reader-pause', value => TTS.configChange('pauseDuration', value)); updateReaderState(project, 'idle'); }
  function updateReaderState(project, state, voiceName = null) { document.querySelectorAll('.word-group').forEach(node => node.classList.toggle('active', Number(node.dataset.index) === project.progress.currentGroupIndex)); const status = document.querySelector('#status'); const play = document.querySelector('#play'); const active = ['loading','playing','between_groups','between_repeats'].includes(state); if (status) status.textContent = state === 'loading' ? `${t('reader.loading','Loading browser voice')}${voiceName ? ` · ${voiceName}` : '…'}` : state === 'finished' ? t('reader.finished','Complete · press Restart to begin again') : `${t('reader.group','Group')} ${Math.min(project.progress.currentGroupIndex + 1, project.groups.length)} / ${project.groups.length} · ${t('reader.repeat','Repeat')} ${project.progress.currentRepeat} / ${project.config.repetitions}${voiceName ? ` · ${voiceName}` : ''}`; if (play) { play.textContent = state === 'playing' ? 'Ⅱ' : active ? '■' : '▶'; play.setAttribute('aria-label', active ? t('reader.pause','Pause') : t('reader.play','Play')); } }
  function staticPage(title, body) { app().innerHTML = `<div class="static-content"><div class="eyebrow">Dictator</div><h1>${title}</h1>${body}</div>`; }
  function renderAbout() { staticPage(t('about.title','A calmer way to learn.'), `<p>${t('about.body','Dictator turns notes, essays, PDFs, and study material into speech so you can listen, repeat, and retain more. It is built for students, language learners, and anyone who wants to dictate notes to a computer and review them by ear in a private browser workflow.')}</p><section><h2>${t('about.section1','Designed for repetition')}</h2><p>${t('about.section1p','Small groups, adjustable pace, and a visible reading highlight help you stay with the sentence instead of racing past it.')}</p></section><section><h2>${t('about.section2','Private by default')}</h2><p>${t('about.section2p','Your saved projects live in this browser using local storage and IndexedDB. Dictator does not upload your notes to an application server.')}</p></section><section><h2>Contact</h2><p>Questions, feedback, or collaboration ideas? Reach us at <a href="mailto:hello@dictator.app">hello@dictator.app</a>.</p></section>`); }
  function renderHowToUse() { staticPage(t('how.title','How to use Dictator.'), `<p>${t('how.body','Start on Home, paste a note or load a TXT, PDF, or DOCX file, then create a project.')}</p><section><h2>${t('how.build','Build a session')}</h2><ol><li>${t('how.step1','Add your text.')}</li><li>${t('how.step2','Choose your default group size, repetitions, speed, and language in Settings.')}</li><li>${t('how.step3','Start the session and follow the highlighted groups.')}</li></ol></section><section><h2>${t('how.questions','Questions')}</h2><div class="faq-item"><button class="faq-question">${t('how.groupQuestion','What does a group mean?')}</button><div class="faq-answer"><p>${t('how.groupAnswer','A group is the number of words Dictator speaks together before moving on.')}</p></div></div><div class="faq-item"><button class="faq-question">${t('how.settingsQuestion','Can I change settings while reading?')}</button><div class="faq-answer"><p>${t('how.settingsAnswer','Yes. Reader controls save changes to the current project and reset grouping when necessary.')}</p></div></div></section>`); document.querySelectorAll('.faq-question').forEach(button => button.onclick = () => button.parentElement.classList.toggle('open')); }
  function renderPrivacy() { staticPage(t('privacy.title','Privacy policy.'), `<p>${t('privacy.body','Dictator is designed to keep your notes on your device. Projects are stored in this browser and speech is produced by the browser Web Speech API.')}</p><section><h2>${t('privacy.whatLeaves','What leaves your device?')}</h2><p>${t('privacy.whatLeavesBody','Nothing is sent to a Dictator application server. Optional PDF, DOCX, and language-detection libraries may be loaded from their public CDNs when you use those features.')}</p></section><section><h2>${t('privacy.removing','Removing your data')}</h2><p>${t('privacy.removingBody','Delete individual projects from the Projects page, or clear this site’s browser storage to remove all local data.')}</p></section>`); }
  new MutationObserver(mountPauseFooter).observe(document.querySelector('#app'), { childList:true, subtree:true });
  return { renderHome, renderProjects, renderProject, renderAbout, renderHowToUse, renderPrivacy, toast, updateReaderState, refreshReader };
})();
