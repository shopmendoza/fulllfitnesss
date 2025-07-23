document.addEventListener('DOMContentLoaded', () => {
    const onPagesDirectory = window.location.pathname.includes('/pages/');
    const contactUrl = onPagesDirectory ? 'contacto.html' : 'pages/contacto.html';
    const assistantHTML = `
        <div id="ai-assistant-container">
            <div id="ai-assistant-icon">
                <i class="fas fa-robot"></i>
            </div>
            <div id="ai-assistant-chat-window" class="hidden">
                <div id="ai-assistant-header">
                    <span>Asistente Virtual</span>
                    <button id="ai-assistant-close-btn"><i class="fas fa-times"></i></button>
                </div>
                <div id="ai-assistant-body">
                    <div class="ai-message">
                        <p>¡Hola! Soy tu asistente virtual. ¿Cómo puedo ayudarte hoy? Aquí tienes algunas preguntas frecuentes:</p>
                    </div>
                    <div id="ai-assistant-questions">
                        <!-- Las preguntas se insertarán aquí -->
                    </div>
                </div>
                <div id="ai-assistant-footer">
                    <p>Si no encuentras tu respuesta, <a href="${contactUrl}">contacta con nosotros</a>.</p>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', assistantHTML);

    const questionsAndAnswers = [
        {
            question: "¿Cómo hago un pedido?",
            answer: "📲 Podés hacer tu pedido directamente desde nuestra web. Elegís tus productos, los agregas al carrito ,le das al boton finalizar compra completás tus datos de contacto y ubicación seleccionas el método de pago confirmas el pedido y sos dirigido a WhatsApp con un mensaje ya predeterminado con tus datos, método de pago y productos seleccionados, y te respondemos lo antes posible para coordinar la entrega."
        },
        {
            question: "¿Cómo se paga el producto?",
            answer: "💵 El pago del producto se realiza en el momento de la entrega. No te pedimos que transfieras antes ni abones por adelantado. Pero si el envío para evitar estafas y bromas de mal gusto de esta forma se evitan estafas de la parte del vendedor y el comprador."
        },
        {
            question: "¿Cuánto cuesta el envío a mi zona?",
            answer: "🚚 El costo del envío se calcula según tu ubicación. Una vez que nos pasás la dirección o ubicación por WhatsApp, te decimos el valor exacto."
        },
        {
            question: "¿Puedo retirar en el local? ¿Dónde queda?",
            answer: "✅ ¡Sí! Podés retirar sin costo en nuestro punto de entrega. Te pasamos la dirección exacta al coordinar el pedido."
        },
        {
            question: "¿Cómo te paso mi ubicación para calcular el envío?",
            answer: "Al completar los campos en la sección de datos personales y entrega y confirmar el pedido son enviados a través de WhatsApp y se hace el cálculo dependiendo la distancia con el vendedor."
        }
    ];

    const questionsContainer = document.getElementById('ai-assistant-questions');
    const assistantBody = document.getElementById('ai-assistant-body');

    questionsAndAnswers.forEach((qa, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('ai-question');
        questionElement.textContent = `${index + 1}. ${qa.question}`;
        questionElement.addEventListener('click', () => {
            // Ocultar todas las respuestas
            const allAnswers = document.querySelectorAll('.ai-answer');
            allAnswers.forEach(ans => ans.style.display = 'none');

            // Si ya existe una respuesta para esta pregunta, la eliminamos para volver a crearla
            const existingAnswer = document.getElementById(`ai-answer-${index}`);
            if (existingAnswer) {
                existingAnswer.remove();
            }
            
            // Crear y mostrar la nueva respuesta
            const answerElement = document.createElement('div');
            answerElement.classList.add('ai-answer');
            answerElement.id = `ai-answer-${index}`;
            answerElement.innerHTML = `<p>${qa.answer}</p>`;
            
            questionElement.after(answerElement);
            // Scroll to the question to keep it in view
            answerElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
        questionsContainer.appendChild(questionElement);
    });

    const assistantIcon = document.getElementById('ai-assistant-icon');
    const chatWindow = document.getElementById('ai-assistant-chat-window');
    const closeBtn = document.getElementById('ai-assistant-close-btn');

    assistantIcon.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });
});
