---
layout: post
title:  "Young people need mentors"
description: "And they need them quickly. In a complex world where it’s not always clear which direction things are moving, the ability to..."
date:   2024-12-08 06:00:00 +0200
categories: software-development
keywords: mentoring, experience, it
tags: miscellaneous programming processes
comments: true
---

**And they need them quickly. In a complex world where it’s not always clear which direction things are moving, the ability to ask the right questions at the right moment is something we primarily learn through experience.**


![Tired and sleeping]({{site.url}}/assets/2024-12-08/a_tired_young_man.png)

This text isn’t a made-up story. It’s about myself over 15 years ago, doing my best to gain experience in IT. It’s a reflection on what I did and why, the consequences of my actions, and what I learned from that experience.

Before we dive in, I’d like to share what inspired me to reflect on and share these experiences. Some time ago, I had an interesting conversation with a colleague who, in addition to being a software developer, is also a teacher. He mentioned that teaching high school students gives him more satisfaction because they have enough foundational knowledge to understand challenging computer science concepts, yet they still need guidance, direction, and inspiration—unlike university students, who are often more self-sufficient.

This insight resonates with my own experiences during the transitional phase between secondary school and higher education. On the technical side, I was fairly proficient, but in every other aspect, I had absolutely no idea what I was doing.

In my second year of studies, I had already developed a fairly efficient approach to studying. To save time, I decided to skip all lectures that, in my opinion, didn’t offer me any real advantage—either because I could learn the material from books or because the courses simply weren’t that interesting. To be honest, I spent far too much time and energy partying, but that’s a different story I won’t get into here.

My main goal at the time was to gain some IT experience. I was worried about finishing my studies without any real-world job experience. So, I sent out probably too many CVs and tried a bit too hard in several interviews. At some point, I became completely exhausted from searching for a job that would be both flexible enough to accommodate my full-time studies (and partying) and valuable enough to help me learn something meaningful.

In the end, I did learn a lot—just not in the way I expected. But more on that later. Stay with me.

# Perfect job

One day, I came across a job listing that I believed was perfect for me. It was for a PHP developer, open to candidates with or without prior work experience, and the only requirement was to complete a home assignment. I was familiar with the company—or rather, I knew the website they operated. I imagined they had a large team of software engineers I could learn from. I was thrilled and couldn’t wait to prepare what they were asking for.

My task was to program a simple keyword search for a given URL. I applied all my knowledge of object-oriented programming and web page parsing to create the perfect solution. I accounted for every corner case I could think of. And it must have been perfect because the next day, I received an email inviting me for an interview. I was scared out of my mind, but at the same time, I felt confident it would go well.

To my surprise, the meeting was conducted by the CEO of the company—and he was the only one there. He spoke mostly about his vision, their work processes, and how they tracked time. Today, I don’t remember much from that conversation. What I do remember is that I tried to maintain eye contact (I’d read somewhere that it’s crucial during interviews) and that not a single question was asked about my actual technical knowledge.

We shook hands and parted ways in a friendly atmosphere. A few days later, I received a call asking if we could meet at the company’s headquarters to discuss the details of our collaboration.

# Headquarters

On my way to the company’s headquarters, I met the second programmer who was going to work with me on the project. He was much older than me and not very talkative. I decided it didn’t matter, as I would soon meet the whole team and was confident I’d find someone to connect with.

To my surprise, the company’s headquarters turned out to be a small building that looked more like a residential house than the office of an internet company. On the other hand, I knew that companies like Google or Microsoft had started in garages. Still, with each passing moment, my expectations clashed more and more with what I was seeing.

The “team” of experienced programmers turned out to be just one rather pensive man, much older than me, who also wasn’t very talkative. However, he quickly showed us how to integrate the project he was working on with an ad provider. Essentially, this involved copying a snippet of generated code into a Smarty template. What a smart guy.

We learned that there were two projects available: rewriting the entire CMS used by the editorial team of a certain portal and adding a few improvements to the homepage and forum. When asked which project we’d like to take on, my new colleague volunteered for the forum improvements before I could even gather my thoughts (still feeling overwhelmed by everything going on).

I felt a bit disappointed because I had secretly hoped to work on the forum improvements. I already had some experience with popular forums like phpBB, so I was confident I could handle it. Rewriting an entire CMS, on the other hand, felt like a daunting challenge. However, I didn’t want to seem incompetent. Looking back, I think an honest reflection—admitting that this might have been too large a project for one person, especially without prior experience—would have been the better approach.

In the end, I thought I’d at least get the other programmer’s phone number before we each went our separate ways. However, as it turned out, I never ended up using it.

# Sweat on the keyboard

For me, the summer holidays had just begun, so I had plenty of time to focus on my new project. It turned out that my task was to adapt another CMS that was already successfully in use at the company. However, from the very start, it was clear that it would require significant modifications. Most notably, the website it was originally designed for was much simpler.

For the summer, I moved from my dorm to my parents’ house, and there, in my room, I spent long hours trying to figure out exactly what I was supposed to do.

I hadn’t been given any specific requirements. I had access to the code for both the old and new CMS, along with a general note that the editorial team was unhappy with the performance of the current CMS. I decided to start by adding the missing functionalities to the new CMS, ensuring it could create and edit the same articles as the old one. There wasn’t a concrete deadline, but I got the impression that they wanted it ready within 2–3 months.

It quickly became clear that I needed to learn a lot of new things—and fast. On the other hand, I had no knowledge of available tools and wasn’t directed to any resources to learn best practices. The code was provided as a zip file to download from an FTP server. I had never used any version control system before, and no one mentioned that it could make my work easier. As a result, I kept creating manual backups of my code, and whenever I needed to revert to an older version, I had to locate the correct folder.

The CMS was written in Zend Framework, which I had no prior experience with, and it also used a rather odd library called Xajax. This library allowed writing Ajax code entirely in PHP, which felt unusual to me.
I felt overwhelmed by the task I had been given. I wasn’t even sure how much time I would need to implement all the functionalities to match the old CMS. To make matters worse, it wasn’t clear what the expectations were. I attributed my struggles largely to my lack of knowledge and competence.

To be “more fair” to my new employer, I came up with a system to divide my time into two categories: time spent learning new things and time actually dedicated to writing new code. If something didn’t work as expected, I would classify the time spent debugging as “learning time.” I decided that it was fair not to report the “learning time” anywhere.

As a result, on days when I reported 6 hours of work, I often ended up spending 10 or even 12 hours tackling various project-related issues. My mom started worrying about me because I hardly ever left my room.

I worked like this for about a month. I was dehydrated, constantly sleep-deprived, and stressed out. I looked like a wreck. After a month, I was supposed to visit the Kraków office to sign the invoices. In terms of hours, I had worked nearly 150% of a full-time schedule, working Monday to Sunday, but I reported just under three weeks because I classified the rest as “learning.”

They wanted to see a demo of my work, but I wasn’t ready because most of the functionalities were still in their early stages. However, for the first time, I got to see the old CMS being used by an editor and heard firsthand what they were complaining about. I regretted that such a confrontation hadn’t happened earlier because, for the first time, I actually learned something meaningful about the application I was supposed to fix.

# You just need to try harder

Encouraged by a brief conversation with the editor, I decided to take a short break to improve my well-being. I went for a long walk in the forest and finally breathed in some fresh air. I took a full day off from the computer, only to wake up early the next day and tackle more issues with the “new” CMS.

And there were plenty of issues. The new CMS barely supported working with images, which was the main performance complaint from the editors. Additionally, the article category structure, search functionality, and many other features worked completely differently.

The new CMS also had to support editing old articles stored in the old CMS, which created a host of additional problems. Instead of devising a sensible data migration strategy, I tried to solve these issues one by one.

At some point, they called me asking for a concrete deadline to present the new CMS. I negotiated a bit, thinking I could somehow pull everything together at the last moment. A few days before the deadline, I was sleeping only 3–4 hours a night, and the night before the handover, I didn’t sleep at all.

I uploaded the application to a test server and waited for feedback. I knew that some features on the new CMS were running slowly, but I hoped it was due to my old computer and that it would perform much better on the actual server. Unfortunately, I knew very little about SQL query optimization at the time, and my assumption turned out to be wrong.

## No issue tickets at all

I expected the feedback wouldn’t be perfect and assumed I’d have a few things to fix—like the issue with image upload speed, for example. But for several days, there was complete silence. I didn’t receive any list of errors to address.

Instead, a few days later, I received an email from the CEO informing me that what I had delivered was in such poor condition that it wasn’t worth fixing and the CMS would need to be completely rewritten by another developer. I didn’t receive payment for the next month, but they also didn’t ask me to return the money I had already been paid for the three weeks I reported.

I even considered giving the money back, feeling like I had let them down so badly, but several people advised me against it.

# What Did This Experience Teach Me?

First and foremost, if I were to take on a similar project today, I would spend the first few days fully focused on gathering requirements instead of trying to figure everything out on my own. This would involve reaching out to people who worked with the CMS daily, as well as decision-makers who had chosen to fund the project. It took me a long time to realize that my job wasn’t just about writing code. I also learned the importance of respecting my own time, valuing others’ time, ensuring the quality of the code I deliver, and taking care of my health.

Secondly, I would push for much greater transparency in project management. Since there was no willingness from “higher-ups” to regularly monitor progress, I should have proposed implementing a tool for tracking tasks so that progress would be visible and issues could be addressed earlier.

Thirdly, the pace I imposed on myself often left me dissatisfied with the quality of what I delivered. I secretly hoped for a “second chance” to fix the mistakes.

This project had many shortcomings. It actually took me a few years to realize that my failure wasn’t solely due to my lack of competence but also to the way the project was managed, the decisions that were made, and how communication was handled (which, back then, relied mostly on email).

In summary:
- **Set expectations upfront**: Define what both sides expect, such as the amount of work the investor can afford and the timeline for delivering the project.
- **Gather requirements**: Identify the problems users face and estimate solutions based on those insights.
- **Plan milestones**: After collecting requirements and expectations, set milestones or discuss reducing the scope of work if necessary.
- **Phased implementation**: The new CMS could have been rolled out in stages, allowing part of the editorial work to continue in the old CMS while key, problematic tasks were handled in the new CMS.
- **Collaboration improvements**: Despite having two programmers, opportunities like regular code reviews were missed. These could have improved code quality and facilitated knowledge sharing.
- **Undefined deadlines**: A lack of clear deadlines or specific expectations created unnecessary stress and uncertainty.
- Most likely, the decision to use an existing CMS from another portal wasn’t the best idea. This decision should have been challenged, and alternatives considered—such as implementing the problematic functionalities from scratch or performing a thorough overhaul of the existing CMS, which could also have been done in phases.

# What Does This Experience Teach Me About Young People Without Experience?

Over the past 15 years, I’ve worked with many developers, both juniors and those with over 20 years of experience. There were juniors who learned very quickly and delivered excellent results from the start, but that’s not always the case.

If I had someone back then to teach me good practices, advise me on the right tools—like for example using a code repository—explain that working late into the night isn’t a great idea, encourage me to challenge others’ ideas when necessary (like for example using the “new” CMS), and help me think about breaking a large task into smaller parts with clear milestones, this project most likely wouldn’t have ended in such a failure.

# Final thoughts

Some people, especially those without much experience, prefer to try solving a problem on their own rather than seeking help from others. As experienced engineers, we sometimes need to take the initiative and encourage our younger colleagues to adopt a more proactive approach.

No one is perfect, especially at the beginning. However, giving someone with the potential to grow a few good tips on how to work better often yields results much faster than you might expect.
