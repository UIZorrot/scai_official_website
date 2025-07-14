<template>
    <div class="min-h-screen">
        <!-- Hero 区域 -->
        <HeroSection />

        <!-- Agents 协作区域 -->
        <!-- <AgentsSection /> -->

        <!-- Staking & Rewards 区域 -->
        <StakingSection />

        <!-- 产品画廊区域 -->
        <ProductGallery />

        <!-- 网络分析区域 -->
        <!-- <NetworkAnalytics /> -->

        <!-- 团队介绍区域 -->
        <TeamSection />

        <!-- 项目路线图区域 -->
        <RoadmapSection />
    </div>
</template>

<script setup lang="ts">
// 页面元数据
useHead({
    title: 'SCAI - Web3 Brain for Science',
    meta: [
        {
            name: 'description',
            content: 'SCAI是为科学研究提供的Web3智能平台，通过区块链技术和人工智能推动科学发现和创新合作。',
        },
        {
            name: 'keywords',
            content: 'Web3, 科学研究, 人工智能, 区块链, 科学发现, 数据分析, SCAI',
        },
        {
            property: 'og:title',
            content: 'SCAI - Web3 Brain for Science',
        },
        {
            property: 'og:description',
            content: 'SCAI是为科学研究提供的Web3智能平台，通过区块链技术和人工智能推动科学发现和创新合作。',
        },
        {
            property: 'og:type',
            content: 'website',
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: 'SCAI - Web3 Brain for Science',
        },
        {
            name: 'twitter:description',
            content: 'SCAI是为科学研究提供的Web3智能平台，通过区块链技术和人工智能推动科学发现和创新合作。',
        },
    ],
})

// 页面加载动画
onMounted(() => {
    // 可以在这里添加页面加载完成后的动画效果
    console.log('SCAI 官网已加载完成')
})
</script>

<style scoped>
/* 页面特定样式 */
</style>
