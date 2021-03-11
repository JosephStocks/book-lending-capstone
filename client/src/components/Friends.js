import React from 'react';
import FriendCard from './FriendCard';
import * as S from '../styles/Styles'

const Friends = () => {
    return (
        <>
            <S.H2 className="mb-5">Your Friends</S.H2>
            <FriendCard/>
            <FriendCard/>
            <FriendCard/>
        </>
    )
}

export default Friends;