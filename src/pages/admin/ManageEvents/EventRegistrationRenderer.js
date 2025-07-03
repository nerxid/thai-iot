
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventRegistrationRenderer = ({ formFields }) => {
    const [dateValues, setDateValues] = useState({});

    const handleDateChange = (fieldId, date) => {
        setDateValues(prev => ({ ...prev, [fieldId]: date }));
    };

    const renderField = (field) => {
        const label = `${field.label}${field.isRequired ? ' *' : ''}`;

        switch (field.type) {
            case 'Short Answer':
                return <Form.Control type="text" placeholder={field.placeholder || ''} required={field.isRequired} />;
            
            case 'Paragraph':
                return <Form.Control as="textarea" rows={3} placeholder={field.placeholder || ''} required={field.isRequired} />;
            
            case 'Multiple choice':
                return (
                    <div className="mt-2">
                        {field.options.map(opt => (
                            <Form.Check type="radio" key={opt.id} id={`field-${field.id}-opt-${opt.id}`} label={opt.value} name={`field-${field.id}`} required={field.isRequired} />
                        ))}
                    </div>
                );

            case 'Checkboxes':
                 return (
                    <div className="mt-2">
                        {field.options.map(opt => (
                            <Form.Check type="checkbox" key={opt.id} id={`field-${field.id}-opt-${opt.id}`} label={opt.value} name={`field-${field.id}`} />
                        ))}
                    </div>
                );

            case 'Dropdown':
                return (
                    <Form.Select required={field.isRequired}>
                        <option value="">-- กรุณาเลือก --</option>
                        {field.options.map(opt => (
                            <option key={opt.id} value={opt.value}>{opt.value}</option>
                        ))}
                    </Form.Select>
                );
            
            case 'File upload':
                return <Form.Control type="file" required={field.isRequired} />;

            case 'Date':
                return (
                    <DatePicker 
                        selected={dateValues[field.id] || null} 
                        onChange={(date) => handleDateChange(field.id, date)}
                        className="form-control" 
                        placeholderText="กรุณาเลือกวันที่"
                        dateFormat="dd/MM/yyyy"
                        required={field.isRequired}
                    />
                );
            
            case 'Time':
                 return <Form.Control type="time" required={field.isRequired} />;

            default:
                return <Form.Control type="text" placeholder={field.placeholder || ''} required={field.isRequired} />;
        }
    };

    return (
        <Form>
            {formFields.map(field => (
                <Form.Group key={field.id} className="mb-4">
                    <Form.Label as="h5">{`${field.label}${field.isRequired ? ' *' : ''}`}</Form.Label>
                    {renderField(field)}
                </Form.Group>
            ))}
        </Form>
    );
};

export default EventRegistrationRenderer;