import React from 'react';

import { useRouter } from 'next/router';

import { IoIosArrowBack } from 'react-icons/io';

import { StyledBackButton } from './styles';

export const BackButton: React.FC = () => {
    const router = useRouter();

    return (
        <StyledBackButton color={'secondary'} onClick={() => router.push('/')}>
            <IoIosArrowBack size={20} />
        </StyledBackButton>
    );
};
