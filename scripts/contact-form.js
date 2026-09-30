// Envia o formulário de contato para o e-mail da escola via FormSubmit (formsubmit.co)
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const status = document.getElementById('contact-form-status');
    const button = form.querySelector('button[type="submit"]');
    const endpoint = 'https://formsubmit.co/ajax/contato@gaudencischool.com';

    function showStatus(text, ok) {
        status.textContent = text;
        status.className = 'text-center font-semibold ' + (ok ? 'text-green-600' : 'text-red-600');
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        button.disabled = true;
        button.textContent = 'Enviando...';
        status.textContent = '';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(form)
            });
            const result = await response.json().catch(() => ({}));

            if (response.ok && String(result.success) !== 'false') {
                form.reset();
                showStatus('Mensagem enviada! Responderemos em breve pelo seu e-mail.', true);
            } else {
                throw new Error(result.message || 'Falha no envio');
            }
        } catch (error) {
            showStatus('Não foi possível enviar agora. Escreva para contato@gaudencischool.com.', false);
        } finally {
            button.disabled = false;
            button.textContent = 'Enviar Mensagem';
        }
    });
});
