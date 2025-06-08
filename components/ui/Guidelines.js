import ContentGuidelines, {DashboardHeading, DashboardWorkspaceBlock} from "@/components/ui/Structure";

export const BookGuidelines = () => {
    return (
        <DashboardWorkspaceBlock>

            <DashboardHeading>Guidelines</DashboardHeading>

            <div className="text-sm text-gray-dark gap-1 inline! mb-4 ">Please read these guidelines to comply with our content policy. All content will be moderated; resources not complying with our policies will be removed and users will be banned whereas minor mistakes will be automatically corrected. Your resource may be sent to a moderation queue for upto 5 days. Fields marked with a (<span className={" inline text-red-500"}>*</span>) are mandatory. All fields must be in compliance with the rules below.</div>

            <ContentGuidelines
                title="Title"
                lines={[
                    'The title of the book as seen on the book\'s cover',
                    'Should be in the format of [Book Name] [Nth] Edition (if edition applies).',
                    'This helps indexing your resource and allows more people to find it.',
                    'e.g. Digital Computer Electronics 3rd Edition.',
                ]}
            />

            <ContentGuidelines
                title="Author"
                lines={[
                    'The author(s) of the book.',
                    'Capitalize authors\' name & separate multiple authors with a comma',
                    'e.g. Albert P. Malvino, Jerald A. Brown',
                ]}
            />

            <ContentGuidelines
                title="Subject"
                lines={[
                    'The subject the book is taught in, does not have to incorporate for all subjects its used for.',
                    'Capitalize subject name and put lowercase on "and".',
                    'e.g. Communication and Presentation Skills.',
                ]}
            />

            <ContentGuidelines
                title="Semester"
                lines={[
                    'The semester in which the book is likely to be used.',
                    'e.g. 3.',
                ]}
            />

            <ContentGuidelines
                title="University"
                lines={[
                    'Same rules as Subject.',
                    'Mention the relevant university the resource belongs to.',
                    'Any university from around the world can be mentioned.',
                    'e.g. University of Karachi.',
                ]}
            />

            <ContentGuidelines
                title="Book URL"
                lines={[
                    'Absolute URL to the location where the book is located.',
                    'Should NOT be behind an authentication layer or paywall.',
                    'Google Drive links are preferred but remember to give access to all. Links with "Request Permission" enabled will be removed.',
                ]}
            />

        </DashboardWorkspaceBlock>
    )
}

export const ResourceGuidelines = () => {
    return (
        <DashboardWorkspaceBlock>

            <DashboardHeading>Guidelines</DashboardHeading>

            <div className="text-sm text-gray-dark gap-1 inline! mb-4 ">Please read these guidelines to comply with our content policy. All content will be moderated; resources not complying with our policies will be removed and users will be banned whereas minor mistakes will be automatically corrected. Your resource may be sent to a moderation queue for upto 5 days. Fields marked with a (<span className={" inline text-red-500"}>*</span>) are mandatory. All fields must be in compliance with the rules below.</div>

            <ContentGuidelines
                title="Title"
                lines={[
                    'Should be in the format of [Resource Type] [Subject] [Teacher Initials] [Year].',
                    'This helps indexing your resource and allows more people to find it.',
                    'e.g. Notes Communication and Presentation Skills KJ 2025.',
                ]}
            />

            <ContentGuidelines
                title="Subject"
                lines={[
                    'The subject of the resource.',
                    'Capitalize subject name and put lowercase on "and".',
                    'e.g. Communication and Presentation Skills',
                ]}
            />

            <ContentGuidelines
                title="Semester"
                lines={[
                    'The semester in which the book is likely to be used.',
                    'e.g. 3.',
                ]}
            />

            <ContentGuidelines
                title="Teacher"
                lines={[
                    'The name of the teacher that the resource is related to.',
                    'Capitalize names.',
                    'e.g. Khalid Jamal.',
                ]}
            />

            <ContentGuidelines
                title="University"
                lines={[
                    'Same rules as Subject.',
                    'Mention the relevant university the resource belongs to.',
                    'Any university from around the world can be mentioned.',
                    'e.g. University of Karachi.',
                ]}
            />

            <ContentGuidelines
                title="Resource URL"
                lines={[
                    'Absolute URL to the location where the resource is located.',
                    'Should NOT be behind an authentication layer or paywall.',
                    'Google Drive links are preferred but remember to give access to all. Links with "Request Permission" enabled will be removed.',
                ]}
            />

        </DashboardWorkspaceBlock>
    )
}

export const ChannelGuidelines = () => {
    return (
        <DashboardWorkspaceBlock>

            <DashboardHeading>CHANNEL Guidelines</DashboardHeading>

            <div className="text-sm text-gray-dark gap-1 inline! mb-4 ">Please read these guidelines to comply with our content policy. All content will be moderated; resources not complying with our policies will be removed and users will be banned whereas minor mistakes will be automatically corrected. Your resource may be sent to a moderation queue for upto 5 days. Fields marked with a (<span className={" inline text-red-500"}>*</span>) are mandatory. All fields must be in compliance with the rules below.</div>

            <ContentGuidelines
                title="Title"
                lines={[
                    'Should be in the format of [Resource Type] [Subject] [Teacher Initials] [Year].',
                    'This helps indexing your resource and allows more people to find it.',
                    'e.g. Notes Communication and Presentation Skills KJ 2025.',
                ]}
            />

            <ContentGuidelines
                title="Subject"
                lines={[
                    'The subject of the resource.',
                    'Capitalize subject name and put lowercase on "and".',
                    'e.g. Communication and Presentation Skills',
                ]}
            />

            <ContentGuidelines
                title="Semester"
                lines={[
                    'The semester in which the book is likely to be used.',
                    'e.g. 3.',
                ]}
            />

            <ContentGuidelines
                title="Teacher"
                lines={[
                    'The name of the teacher that the resource is related to.',
                    'Capitalize names.',
                    'e.g. Khalid Jamal.',
                ]}
            />

            <ContentGuidelines
                title="University"
                lines={[
                    'Same rules as Subject.',
                    'Mention the relevant university the resource belongs to.',
                    'Any university from around the world can be mentioned.',
                    'e.g. University of Karachi.',
                ]}
            />

            <ContentGuidelines
                title="Resource URL"
                lines={[
                    'Absolute URL to the location where the resource is located.',
                    'Should NOT be behind an authentication layer or paywall.',
                    'Google Drive links are preferred but remember to give access to all. Links with "Request Permission" enabled will be removed.',
                ]}
            />

        </DashboardWorkspaceBlock>
    )
}