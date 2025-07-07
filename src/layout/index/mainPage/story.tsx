import {AnimatePresence, motion} from 'framer-motion';
import React from "react";

type animation = {
    title: string,
    info: string
}

export default function Story() {

    const stories = [
        {
            title: '逃出沉默的房间',
            description: '张三从小生活在父亲暴力的阴影下，习惯了用沉默保护自己。一次偶然的作文课上，老师从他的文字中读出了异常。在心理辅导和社工的介入下，张三终于得到了帮助。他搬离了那个伤痛的家，也在心灵上逐渐愈合。现在，他正努力成为一名心理咨询师，帮助像曾经的自己一样的孩子们。',
        },
        {
            title: '他不是在“管教”我',
            description: '李四从小被父母以“打是亲、骂是爱”的方式“教育”，直到成年后开始频繁梦到童年的恐惧。在大学心理课程上，他才意识到自己经历的是家庭暴力。他开始尝试与父母沟通、设立边界，虽然过程艰难，但终于为自己争取了一个健康的情感空间。',
        },
        {
            title: '妈妈的求救信号',
            description: '张三十岁那年，第一次看到母亲偷偷在夜里哭泣。父亲的家暴多年未曾被发现，直到一次邻居报了警。在社会工作者的帮助下，他和母亲搬离了原来的住所。如今，张三在学校中参与反暴力志愿活动，告诉更多人：“沉默不是保护，而是纵容。”',
        },
        {
            title: '当我开始说“不”',
            description: '李四在大学宿舍中长期被室友排挤与言语霸凌。他最初选择忍让，但焦虑和失眠影响了学习和生活。通过心理咨询，他学会了维护边界，也促使校方建立宿舍冲突干预机制。这段经历成为他成长中的重要转折点。',
        },
        {
            title: '她们互相救赎',
            description: '张三和李四在城市妇女庇护中心相识。一个逃离了家暴，一个刚刚摆脱情感操控。在一次手工艺课程中，她们成为朋友，相互扶持走出阴影。后来，她们合开了一家咖啡店，为更多遭受暴力的女性提供就业机会与陪伴。',
        },
        {
            title: '邻居的悄悄话',
            description: '张三一直注意到隔壁李四家经常传来争吵声。他没有冷漠，而是在合适时机与李四谈心，并匿名联系了社区社工。李四在帮助下摆脱控制欲极强的父亲，搬到亲戚家生活。张三那一句“你还好吗”，成为李四人生的转折点。',
        },
        {
            title: '手机里的求救',
            description: '初中生张三常在社交平台发令人担忧的动态。一次，班主任发现他朋友圈里有疑似伤痕的照片，及时联系了心理老师和校方。原来他长期遭遇父亲暴力威胁。经过学校和警方的帮助，张三进入保护程序，重新开启了新生活。',
        },
        {
            title: '一句“我信你”',
            description: '李四是个活泼开朗的高中生，却突然变得沉默寡言。在辅导员的一次谈话中，她哭着说出自己在家中遭遇的侵犯。“我信你”是辅导员的第一句话。这句话让李四走进了专业系统，也成为她走出创伤的第一步。',
        },
        {
            title: '打破传统的束缚',
            description: '张三从小被灌输“家丑不可外扬”的观念，婚后长期忍受丈夫的羞辱与冷暴力。直到一次社区讲座让她意识到自己并不孤单。她勇敢地申请法律援助并离婚，如今在妇女组织中工作，帮助更多女性拥有改变的力量。',
        }
    ];

    const Animation: React.FC<animation> = ({title, info}) => {
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


    return (
        <>
            <div className="story"
            >
                <div className="story-left">
                    <Animation title={stories[0].title} info={stories[0].description}/>
                    <Animation title={stories[3].title} info={stories[3].description}/>
                    <Animation title={stories[6].title} info={stories[6].description}/>
                </div>

                <div className="story-middle">
                    <Animation title={stories[1].title} info={stories[1].description}/>
                    <Animation title={stories[4].title} info={stories[4].description}/>
                    <Animation title={stories[7].title} info={stories[7].description}/>
                </div>

                <div className="story-right">
                    <Animation title={stories[2].title} info={stories[2].description}/>
                    <Animation title={stories[5].title} info={stories[5].description}/>
                    <Animation title={stories[8].title} info={stories[8].description}/>
                </div>
            </div>
        </>
    );
}