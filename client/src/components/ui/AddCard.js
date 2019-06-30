import React from 'react';
import { Card } from 'components/ui';
import Form from 'components/form/Form';

const AddCard = ( { fields } ) => {
    return (
        <Card>
            <Form fields={fields} />
        </Card>
    );
};

export default AddCard;