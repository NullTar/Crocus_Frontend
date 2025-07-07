import {AnimatePresence, motion} from 'framer-motion';
import React from "react";
import {StoryData} from "@@/ts/model.ts";
import {useState, useEffect} from "react";
import {getRecommendStories} from "@@/ts/request/story.ts";
import {storyIndexKey} from "@@/function/localStorage.ts";
import {animationProps} from "@@/ts/props.ts";
import {Pop} from "@@/layout/system/components/GlobalPop.tsx";

const Animation: React.FC<animationProps> = ({title, info}) => {
    return (
        <>
            <AnimatePresence>
                <motion.div className="items" layout
                            initial={{opacity: 0.2, y: 0}}
                            whileInView={{
                                opacity: [0.5, 0.6, 0.7, 0.8, 0.9, 1],
                                y: -100,
                                transition: {duration: 1.2}
                            }}
                            whileHover={{scale: [null, 1.16, 1.1], transition: {duration: 0.3}}}
                            whileTap={{scale: 1.14, transition: {duration: 0.08, ease: "easeInOut"}}}
                            viewport={{once: true}}
                >
                    <p className="title">{title}</p>
                    <p>{info}</p>
                </motion.div>
            </AnimatePresence>

        </>
    )
}

export default function Story() {

    const [story, setStories] = useState<Array<StoryData>>([])
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [currentStory, setCurrentStory] = useState<StoryData | null>(null);

    const getStoryList = async (id?: number) => {
        const result = await getRecommendStories(id)
        if (result.data) {
            setStories(result.data)
            const maxId = result.data.length > 0 ? Math.max(...result.data.map(s => s.id)) : 1;
            localStorage.setItem(storyIndexKey, JSON.stringify(maxId))
        }
    }

    const getPreview = (text: string) => {
        const match = text.match(/(.*?[。！？!?]){1,2}/);
        return match ? match[0] + "..." : text;
    };

    const handlePop = (id: number) => {
        const book = story.find(b => b.id == id);
        setCurrentStory(book || null);
        setShowPopup(true)
    }

    useEffect(() => {
        const index = localStorage.getItem(storyIndexKey)
        getStoryList(index ? Number(JSON.parse(index)) + 1 : 0)
    }, []);

    return (
        <>
            <div className="story"
            >
                {["story-left", "story-middle", "story-right"].map((className, colIndex) => (
                    <div className={className} key={className} onClick={() => handlePop(story[colIndex].id)}>
                        {story.filter((_, i) => i % 3 === colIndex)
                            .map((s, i) => (
                                <Animation key={i} title={s.title} info={getPreview(s.content)}/>
                            ))}
                    </div>
                ))}
                {currentStory &&
                    <Pop isOpen={showPopup} title={currentStory.title} onClose={() => setShowPopup(false)}>
                        <div className='story-detail'>
                            {currentStory.content}
                        </div>
                    </Pop>
                }
            </div>
        </>
    );
}