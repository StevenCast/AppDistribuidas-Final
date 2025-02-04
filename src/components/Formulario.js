import React, { useState } from 'react';

const Formulario = () => {
    const [formData, setFormData] = useState({
        objetoCeleste: '',
        fechaObservacion: '',
        ubicacion: '',
        nombreObservador: '',
        comentarios: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost/api/observaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({
                    objetoCeleste: '',
                    fechaObservacion: '',
                    ubicacion: '',
                    nombreObservador: '',
                    comentarios: ''
                });
                alert('Observación registrada correctamente');
            } else {
                alert('Error al enviar los datos');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar los datos');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2 className="form-title">Registro de Observaciones Astronómicas</h2>

            {[ 
                { name: 'objetoCeleste', label: 'Objeto Celeste', type: 'text' },
                { name: 'fechaObservacion', label: 'Fecha de Observación', type: 'date' },
                { name: 'ubicacion', label: 'Ubicación', type: 'text' },
                { name: 'nombreObservador', label: 'Nombre del Observador', type: 'text' },
                { name: 'comentarios', label: 'Comentarios', type: 'textarea' },
            ].map((field) => (
                <div key={field.name} className="form-group">
                    <label htmlFor={field.name} className="form-label">
                        {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                        <textarea
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="form-input form-textarea"
                            placeholder={`Ingrese ${field.label.toLowerCase()}...`}
                            required
                        />
                    ) : (
                        <input
                            id={field.name}
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="form-input"
                            placeholder={`Ingrese ${field.label.toLowerCase()}...`}
                            required
                        />
                    )}
                </div>
            ))}

            <button type="submit" className="submit-button">
                Enviar Observación
            </button>
        </form>
    );
};

export default Formulario;
