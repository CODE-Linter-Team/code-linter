
import { visit } from 'unist-util-visit';

const selectCodeUniversityUsers = /\@\[user\]\((.*)\)/g;

const isSamePosition = (pos0: any, pos1: any) => {
    return pos0.line === pos1.line && pos0.column && pos1.column;
};

const userMap = {
    'linus.bolls@code.berlin': {
        email: 'linus.bolls@code.berlin',
        name: 'Linus Bolls',
        url: 'https://github.com/LinusBolls'
    },
    'laurin.nottemann@code.berlin': {
        email: 'laurin.nottemann@code.berlin',
        name: 'Laurin Nottemann',
        url: 'https://github.com/LaurinNottemann'
    }
};

const EntityTypes = {
    "user": {
        id: "user",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="10px" height="10px" style="margin-right: 2px; fill: var(--primary)"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>`
    }
}

export default function codeUniversityEntityBytemdPlugin() {
    return {
        rehype: (processor: any) => {
            return processor.use(() => (tree: any) => {
                let linesEndingWithSymbols: any = [];
                let links: any = [];
                let linkTexts: any = [];

                visit(tree, (node) => {
                    if (node.type === 'text' && Object.keys(EntityTypes).includes(node.value)) linkTexts.push(node);

                    if (node.type === 'text' && node.value.endsWith('@')) linesEndingWithSymbols.push(node);

                    if (node.type === 'element' && node.tagName === 'a') links.push(node);
                });
                for (const line of linesEndingWithSymbols) {
                    const matchingLink = links.filter((i: any) =>
                        isSamePosition(i.position.start, line.position.end)
                    )[0];

                    const matchingLinkText = linkTexts.filter((i: any) => {
                        return (
                            matchingLink.position.start.column < i.position.start.column &&
                            matchingLink.position.start.line === i.position.start.line &&
                            matchingLink.position.end.column > i.position.end.column
                        );
                    })[0];
                    if (matchingLink == null || matchingLinkText == null) return;

                    const entityType = matchingLinkText.value

                    line.value = line.value.slice(0, -1);

                    const entityId = matchingLink.properties.href;

                    matchingLink.properties["data-codeLinter-entityLink"] = ""
                    matchingLink.properties["data-codeLinter-entityType"] = entityType
                    matchingLink.properties['data-codeLinter-entityId'] = entityId;
                }
            });
        },
        // dont use this syntax, it will cause a bug!!!!
        // async viewerEffect() { },

        viewerEffect: ({ markdownBody, file }: { markdownBody: HTMLDivElement, file: any }) => {

            (async () => {

                const codeUniversityEntityLinks = markdownBody.querySelectorAll<HTMLLinkElement>(
                    '[data-codeLinter-entityLink]'
                );
                for (const entityLink of codeUniversityEntityLinks) {

                    entityLink.classList.add('codeUniversityEntityLink');

                    const entityTypeId = entityLink.getAttribute("data-codeLinter-entityType")
                    const entityId = entityLink.getAttribute('data-codeLinter-entityId');

                    const entityType = EntityTypes[entityTypeId]

                    if (entityType?.id === EntityTypes.user.id) {

                        entityLink.innerHTML = `${entityType.icon}${entityId}`

                        // const user = userMap[entityId];

                        // entityLink.href = user.url

                        // TODO: fetch data about user
                        //     entityLink.innerHTML =
                        //         `${entityType.icon}${user.name}<div class="userEntityTooltip">
                        // 							<img src="https://prod-code-uploads.s3.eu-central-1.amazonaws.com/Avatar/cksn66uwl47500wlcrpg94tok/2021-8-23/58779762-f89f-4885-96fe-2a0bb1d0a4c3--IMG_1518.png"/>
                        // 							<div style="display: flex; flex-direction: column">
                        // 								<span>${user.name}</span>
                        // 								<span>5th gen SE</span>
                        // 							</div>
                        // 							<div style="display: flex; flex-direction: column; justify-content: space-between; height: 3rem">

                        // <svg width="12" height="12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        // <path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z""/>
                        // <path fill-rule="evenodd" clip-rule="evenodd" d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z" fill="rgb(152, 152, 152)"/>
                        // <div xmlns="" id="divScriptsUsed" style="display: none"/><script xmlns="" id="globalVarsDetection" src="moz-extension://a82ff50f-28d0-473c-9044-8ff8145eade9/js/wrs_env.js"/></svg>

                        // <svg width="10" height="10" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style="left: 1px">
                        // <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="rgb(152, 152, 152)"/>
                        // <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z" fill="rgb(152, 152, 152)"/>
                        // <path d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z" fill="rgb(152, 152, 152)"/>
                        // <path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z" fill="rgb(152, 152, 152)"/>
                        // <div xmlns="" id="divScriptsUsed" style="display: none"/><script xmlns="" id="globalVarsDetection" src="moz-extension://a82ff50f-28d0-473c-9044-8ff8145eade9/js/wrs_env.js"/></svg>

                        // <svg width="13.7" height="10" viewBox="0 0 37 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        // <path d="M13.2 0.600098L0.499975 13.0001L0.0999756 13.4001L13.2 26.3001L17.7 21.9001L8.79997 13.5001L17.7 5.0001L13.2 0.600098ZM23.8 0.600098L19.3 5.0001L28.2 13.5001L19.3 21.9001L23.8 26.3001L36.9 13.4001L36.5 13.0001L23.8 0.600098Z" fill="#989898"/>
                        // </svg>

                        // </div></div>`
                    }
                }
            })()
        },
        actions: [
            {
                title: "amon goose", icon: "", handler: {
                    type: 'action',
                    click({ wrapText, editor }: any) {

                        editor.focus()
                    },
                },
            }
        ]
    };
}