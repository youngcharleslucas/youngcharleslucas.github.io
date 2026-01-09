Migrate a copy of markdown files from one location to another: $1, $2  

$1 = The originating file location  
$2 = The desired file location

Move the contents from location $1 to location $2:  
-   If the location being moved to does not exist, create it.  
-   The file structure in the NEW directory must be as follows:  
    -   There is a parent folder  
    -   Inside the parent folder are the markdown files  
    -   Inside the parent folder there is also an 'images' folder  
    -   All images being referenced by the markdown files in the parent directory will 
        reference images in this 'images' folder  
    -   If there is a markdown file inside the parent folder that has the same name as the parent folder, then change the markdown file name to index.md  
        This is to create index pages for the folders.
    -   It can look like this as an example:  
        ```
            Notes
            |_WGU_Notes
            | |_C949_Data_Structures_I
            | | |_images
            | | | |_avl_height_balance.png
            | | |_index.md
            | | |_Additional_Resources.md
            | |_C950_Data_Structures_II
            |   |_images
            |   | |_some_image.png
            |   |_index.md
            |   |_Practice_Questions.md
            |_Quotes.md
        ```  

File and directory naming in the NEW Directory:  
-   The directory names will be Pascal Snake Case  
-   The image file names will be in regular snake case  
-   If you have to change any of the names, make sure that if the name is being referenced in another file, that all references are changed to match.  

Errors or conflicts:  
-   If you have questions, ask for further clarification  
              
