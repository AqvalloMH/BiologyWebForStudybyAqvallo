document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Quiz functionality
    const quizQuestions = [
        {
            question: "Where are sperm produced in the male reproductive system?",
            options: [
                "Prostate gland",
                "Testes",
                "Sperm duct",
                "Penis"
            ],
            answer: 1,
            explanation: "Sini dek gw jelasin so sperm are produced in the testes, which are located in the scrotum."
        },
        {
            question: "What is the function of the scrotum?" ,
            options: [
                "To store urine",
                "To keep the testes cooler than body temperature",
                "To produce testosterone",
                "To carry sperm to the penis"
            ],
            answer: 1,
            explanation: " Dasar pemula let me explain so the scrotum maintains the testes at a temperature 2-3°C below body temperature, which is essential for sperm production."
        },
        {
            question: "Which hormone triggers ovulation in the menstrual cycle?( Belajar kalo ga tau )",
            options: [
                "FSH",
                "LH",
                "Estrogen",
                "Progesterone"
            ],
            answer: 1,
            explanation: " Too difficult kah ? so Luteinizing hormone (LH) causes the mature egg to be released from the ovary during ovulation (day 14 of the cycle)."
        },
        {
            question: "Where does fertilization typically occur in the female reproductive system? ( Aduhh anak lower juga bisa ini )",
            options: [
                "Ovary",
                "Uterus",
                "Oviduct (Fallopian tube)",
                "Vagina"
            ],
            answer: 2,
            explanation: " Masih salah? nih gw jelasin : Fertilization occurs in the oviduct (fallopian tube) where sperm meets the egg"
        },
        {
            question: "What is the function of the placenta during pregnancy? ( ga bisa balik mts sana )",
            options: [
                "To produce hormones only",
                "To allow exchange of materials between mother and fetus",
                "To protect the fetus from all infections",
                "To provide oxygen to the mother"
            ],
            answer: 1,
            explanation: "Ez gini masa ga bisa jadi gini :the placenta allows oxygen, nutrients, and waste products to be exchanged between mother and fetus without their blood mixing."
        }
    ];
    
    const quizStart = document.getElementById('quiz-start');
    const quizQuestionsSection = document.getElementById('quiz-questions');
    const quizResults = document.getElementById('quiz-results');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const currentQuestionEl = document.getElementById('current-question');
    const totalQuestionsEl = document.getElementById('total-questions');
    const scoreEl = document.getElementById('score');
    const maxScoreEl = document.getElementById('max-score');
    const resultFeedback = document.getElementById('result-feedback');
    
    let currentQuestionIndex = 0;
    let score = 0;
    
    totalQuestionsEl.textContent = quizQuestions.length;
    maxScoreEl.textContent = quizQuestions.length;
    
    startQuizBtn.addEventListener('click', startQuiz);
    nextQuestionBtn.addEventListener('click', showNextQuestion);
    restartQuizBtn.addEventListener('click', restartQuiz);
    
    function startQuiz() {
        quizStart.classList.remove('active');
        quizQuestionsSection.classList.add('active');
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    }
    
    function showQuestion() {
        const question = quizQuestions[currentQuestionIndex];
        currentQuestionEl.textContent = currentQuestionIndex + 1;
        questionContainer.textContent = question.question;
        
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.textContent = option;
            button.addEventListener('click', () => selectAnswer(index, question.explanation));
            optionsContainer.appendChild(button);
        });
        
        nextQuestionBtn.disabled = true;
    }
    
    function selectAnswer(selectedIndex, explanation) {
        const question = quizQuestions[currentQuestionIndex];
        const optionButtons = document.querySelectorAll('.option-btn');
        
        optionButtons.forEach(button => {
            button.disabled = true;
        });
        
        if (selectedIndex === question.answer) {
            optionButtons[selectedIndex].classList.add('correct');
            score++;
        } else {
            optionButtons[selectedIndex].classList.add('incorrect');
            optionButtons[question.answer].classList.add('correct');
            
            // Show explanation for incorrect answers
            const explanationDiv = document.createElement('div');
            explanationDiv.style.marginTop = '1rem';
            explanationDiv.style.padding = '1rem';
            explanationDiv.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
            explanationDiv.style.borderLeft = '4px solid var(--accent)';
            explanationDiv.style.borderRadius = '4px';
            explanationDiv.innerHTML = `<strong>Explanation:</strong> ${explanation}`;
            optionsContainer.appendChild(explanationDiv);
        }
        
        nextQuestionBtn.disabled = false;
    }
    
    function showNextQuestion() {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }
    
    function showResults() {
        quizQuestionsSection.classList.remove('active');
        quizResults.classList.add('active');
        
        scoreEl.textContent = score;
        
        const percentage = (score / quizQuestions.length) * 100;
        let feedback = '';
        
        if (percentage >= 80) {
            feedback = "The question is too easy for you? Wait for new update yaa! -";
        } else if (percentage >= 60) {
            feedback = "Semangat dikit lagi bener";
        } else {
            feedback = "Aduhh dekk makannya biology perhatiin!!!.";
        }
        
        resultFeedback.innerHTML = `
            <p>${feedback}</p>
            <p style="margin-top: 1rem;">You scored ${score} out of ${quizQuestions.length}.</p>
        `;
    }
    
    function restartQuiz() {
        quizResults.classList.remove('active');
        quizStart.classList.add('active');
    }
    
    // Explore button
    document.getElementById('explore-btn').addEventListener('click', function() {
        document.querySelector('.nav-link[data-section="male"]').click();
    });
});