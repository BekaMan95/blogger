import React from 'react';
import { FlatList } from 'react-native';
import Card from './post-card';
import { PostProps } from '../type';


const dummy = [
    {
        id: 1,
        userId: 5,
        title: 'Card One',
        body: 'This is a long description for card one. It contains multiple sentences to demonstrate truncation. When expanded, the full text will be visible.',
    },
    {
        id: 2,
        userId: 5,
        title: 'Card Two',
        body: 'Another card with a description that is long enough to be truncated. Pressing Read More will reveal the rest of the text.',
    },
    {
        id: 3,
        userId: 5,
        title: 'Card Three',
        body: 'Short description here, but still supports the Read More toggle.',
    },
    {
        id: 4,
        userId: 5,
        title: 'Card Four',
        body: 'This card has a very long description to test the truncation and expansion functionality. It should show only one line when collapsed and the full text when expanded.',
    },
    {
        id: 5,
        userId: 5,
        title: 'Card Five',
        body: 'The final card in this list. It also has a long description to ensure that the Read More feature is consistent across all cards.',
    },
    {
        id: 6,
        userId: 5,
        title: 'Card Six',
        body: 'This is an additional card to further test the list rendering and the Read More functionality. It should behave the same as the other cards.',
    }
];


export default function PostList() {
  return (
    <FlatList
    data={dummy}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
        <Card post={item} />
    )}
    />
  );
};

