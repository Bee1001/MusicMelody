import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Loading3 from '../../Loading/Loading3';
import { getTopSong } from '../../redux/actions/song';
import TabItem from './TabItem';
import './Tab.css';

function Tab() {
    const { trending } = useSelector(state => state.song);
    const dispatch = useDispatch();

    const [ indexTab, setIndexTab ] = useState(1);
    const [ songList, setSongList ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);

    useEffect(() => {
        dispatch(getTopSong());
    }, [trending])
    
    const handleTabClick = (index) => {
        setIndexTab(index);
    }

    return (
        <div className="tab-wrapper">
            <div className="tabs-title">
                <div 
                    onClick={ () => handleTabClick(1) }
                    className={ indexTab === 1 ? 'tab-item active' : 'tab-item' } 
                >
                    <span>Trending</span>
                </div>
                <div 
                    onClick={ () => handleTabClick(2) }
                    className={ indexTab === 2 ? 'tab-item active' : 'tab-item' }    
                >
                    <span>Artist</span>
                </div>
                <div 
                    onClick={ () => handleTabClick(3) }
                    className={ indexTab === 3 ? 'tab-item active' : 'tab-item' }    
                >
                    <span>National</span>
                </div>
            </div>
            <div className="tabs-content">
                <div 
                    onClick={ () => handleTabClick(1) }
                    className={ indexTab === 1 ? 'tab-pane active' : 'tab-pane' }    
                >
                    {/* {
                        isLoading && (
                            <div>
                                <Loading3/>
                                <Loading3/>
                                <Loading3/>
                                <Loading3/>
                                <Loading3/>
                                <Loading3/>
                                <Loading3/>
                            </div>
                        )
                    } */}
                    {
                        trending.slice(0, 7).map((song, index) => {
                            return <TabItem 
                                key={song._id}
                                index={index + 1}
                                song={song}
                            />
                        })
                    }
                </div>
                <div 
                    onClick={ () => handleTabClick(2) }
                    className={ indexTab === 2 ? 'tab-pane active' : 'tab-pane' }      
                >
                    {/* <TabItem />    */}
                </div>
                <div
                    onClick={ () => handleTabClick(3) }
                    className={ indexTab === 3 ? 'tab-pane active' : 'tab-pane' }  
                >
                    {/* <TabItem /> */}
                </div>
            </div>
        </div>
    )
}

export default Tab
