
// press
import {string} from "prop-types";
import {Metadata, Sys, RichTextContent, Entry} from "contentful";
import {ReactNode} from "react";

export type PressObject = {

    link: string,
    title: string
}

export type EventObject = {

        bannerImage: any,
        date: string,
        excerpt: RichTextContent,
        pageContent: RichTextContent,
        title: string,
        videoUrl: string,
        zoomUrl: string

}

export type FullEventObject = {
    EventObject: Entry<EventObject>,
    slug: string
}

// researchArticle
export type ResearchArticleObject = {
    citation: string,
    date: string,
    doi: string,
    researchType: string,
    title: string

}

// researchArticleLinks
export type ResearchArticleLinkObject = {
    link: string,
    source: string,
    title: string

}

//researchArticleFeatured
export type ResearchArticleFeaturedObject = {
    link: string,
    mediaSource: string,
    title: string


}

export type FileObject = {
    contentType: string,
    details: {size: number, image: {height: number, width: number}},
    fileName: string,
    url: string
}

export type HeroImageObject = {
    fields: {
        description: string,
        file: FileObject,
        title: string
    }
}

export type ImageObject = {
    fields: {
        description: string,
        file: FileObject,
        title: string
    },
    metadata: Metadata,
    sys: Sys

}

export type AuthorObject = {

    fields: {
        company: string,
        email: string,
        facebook: string,
        github: string,
        image: ImageObject,
        name: string,
        phone:string,
        shortBio: string,
        title: string,
        twitter: string,
    },
    metadata: Metadata,
    sys: Sys,
    body: string,
    description: string
}

export type PersonObject = AuthorObject



//blogPost
export type BlogPostObject = {

    author: AuthorObject,
    body: string,
    description: string,
    heroImage: HeroImageObject,
    publishDate: string,
    slug: string,
    tags: Array<string>,
    title: string

}