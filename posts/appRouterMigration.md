---

title: 'App Router Migration'

date: '2023-06-29'

---

Yesterday I migrated this app from pages router to app router. I watched some video of pros and cons of this new approach and decided to jump on the trend.

However, it seemed to break the github pages deployment pattern/
workflow I have set up before. After researching and trying out, I fixed the issue and here are the steps and learnings.

1. It no longer build static site by default, I have to add the following line to my nextjs config.

    next.config.js
    ```
    module.exports = {
      output: 'export',
      experimental: {
        appDir: true
      }
      ...
    }
    ```

2. step 1 caused usages of `next/image` to throw error, so I needed to either revert the `output: 'export'` line or add an additional line to next config

    next.config.js
    ```
    module.exports = {
      ...
      images: {
        unoptimized: true
      }
    }
    ```

3. step 2 then caused images to not show, then I found out that I haven't updated `basePath` in `next.config.js`, so I added environment variable to dynamically set basepath (on github pages it's served on `/<repo_name>` relative path but locally we want it on root)

    next.config.js
    ```
    module.exports = {
      ...
      basePath: process.evn.BASE_PATH
    }
    ```

    .env.development
    ```
    BASE_PATH=""
    ```

    .env.production
    ```
    BASE_PATH=/myBlogApp
    ```

    nextjs.yml (gh page action)
    ```
    ...
    - name: Build with Next.js
      run: npm run build-prod 
      # "build-prod": "NODE_ENV=production next build"
    ```

4. according to nextjs doc although I specified basePath, for images to work I still need to add the base path value in the image's `src`.
So I did this

    ```
    <Image
      ...
      src={`${process.env.NODE_ENV === "production"? "/myBlogApp": ""}/images/${image}`}
    />
    ```
    I did this instead of using `process.env.BASE_PATH` because client component doesn't seem to recognize environment variables set in `.env*` files.

It worked!