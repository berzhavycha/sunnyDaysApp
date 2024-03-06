'use client'

import React, { useState } from 'react';

import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAutocomplete } from '@/components/common/InputAutocomplete';


export const Header = (): JSX.Element => {
    const [search, setSearch] = useState<string>('')

    return (
        <header className='flex justify-between items-baseline'>
            <div className="flex items-start w-3/4 justify-center gap-8">
                <InputAutocomplete
                    loading={false}
                    data={['London', 'Lviv', 'Kyiv', 'Odessa']}
                    search={search}
                    onSearchChange={setSearch}
                    placeholder={'Enter your city'}
                    error={''}
                    onPressOutside={() => console.log('press outside')}
                    onInputFocus={() => console.log('Input focus')}
                    isAutocompleteShown={true}
                    isAutocompleteEnabled
                />
                <button className='w-1/4 bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 text-white'>Add City</button>
            </div>
            <div className="flex gap-8">
                <button className='bg-blue-600 py-1 px-3 text-white rounded-xl hover:bg-blue-700'>°C</button>
                <button>
                    <FontAwesomeIcon icon={faSignOut} className='text-white text-lg hover:text-gray-400' />
                </button>
            </div>
        </header>
    );
};