import React from 'react';

import Toast from './Toast'

import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';
import { useTransition } from 'react-spring';

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {

    const messageWithTransitions = useTransition(
        messages,
        (message) => message.id,
        {
            from: { right: '-120%' },
            enter: { right: '0%' },
            leave: { right: '-120%' },
        },
    );

    return (
        <Container>
            {messageWithTransitions.map(({ item, key, props }) => (
                <Toast key={key} style={props} message={item}/>
            ))}
        </Container>
    );
};

export default ToastContainer;