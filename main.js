
var courseName =  document.getElementById('courseName')
var  courseCategory = document.getElementById('courseCategory')
var  coursePrice = document.getElementById('coursePrice')
var  courseDescription = document.getElementById('courseDescription')
var courseCapacity = document.getElementById('courseCapacity')
var  btnclick = document.getElementById('click')
var data = document.getElementById('data')
var search = document.getElementById('search')
var courses 
var currentIndex ;
var NameValid = false;
var CatValid = false;
var PriceValid = false;
var DescriptionValid = false;
var CapacityValid = false;

  if(JSON.parse(localStorage.getItem('courses')) == null)
  {
    courses = [];
  }
  else
  courses =JSON.parse(localStorage.getItem('courses'));
read()
checkInput ()


var update = document.getElementById("update")
update.style.display = 'none';

btnclick.onclick = function(e)
{
    e.preventDefault();
    addCourse ()
    clear()
    read ()
   
    console.log(courses);
    
     
}


function addCourse ()
{
    var course =
    {
        courseName : courseName.value,
        courseCategory : courseCategory.value ,
        coursePrice : coursePrice.value ,
        courseDescription : courseDescription.value ,
        courseCapacity : courseCapacity.value 

    }

    courses.push(course);

    localStorage.setItem('courses',JSON.stringify(courses))
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'course add succsesfully',
        showConfirmButton: false,
        timer: 1500
      })
   

}


function clear ()
{
     courseName.value = ''
     courseCategory.value =''
     coursePrice.value = ''
     courseDescription.value = ''
     courseCapacity.value = ''

}
   
//readdata 
function read ()
{
    var res =``
    for(var i =0 ; i<courses.length;i++)
    {
        res+=`
        
        <tr>
        <td>${i+1}</td>
        <td>${courses[i].courseName}</td>
        <td>${courses[i].courseCategory}</td>
        <td>${courses[i].coursePrice}</td>
        <td>${courses[i].courseDescription}</td>
        <td>${courses[i].courseCapacity}</td>
        <td><button class= "btn btn-info" onclick="updateCourse (${i})" >update</td></button>
        <td><button class= "btn btn-danger" onclick="deleteByIndex (${i})">delete</td></button>
        </tr>
        `
    }

    data.innerHTML= res ;
}

//delete all elments and table 
 document.getElementById('deleteBtn').onclick = function()
 {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses = [];
            data.innerHTML = ''
            localStorage.setItem('courses',JSON.stringify(courses))
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
   
   
 }

 function  deleteByIndex (index)
 {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index,1)
            localStorage.setItem('courses',JSON.stringify(courses))
            read()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
   
    
 }

 // function search 
 search.onkeyup = function ()
 {
    var res =``
    for(var i =0 ; i<courses.length;i++)
    {
        if(courses[i].courseName.toLowerCase().includes(search.value.toLowerCase()))
        res+=`
        
        <tr>
        <td>${i+1}</td>
        <td>${courses[i].courseName}</td>
        <td>${courses[i].courseCategory}</td>
        <td>${courses[i].coursePrice}</td>
        <td>${courses[i].courseDescription}</td>
        <td>${courses[i].courseCapacity}</td>
        <td><button class= "btn btn-info" onclick="updateCourse (${i})">update</td></button>
        <td><button class= "btn btn-danger" onclick="deleteByIndex (${i})">delete</td></button>
        </tr>
        `
    }

    data.innerHTML= res ;
 }

 function updateCourse (index)
 {
  console.log(index)
  var c = courses[index]
  currentIndex = index
  courseName.value = c.courseName;
  courseCategory.value = c.courseCategory;
  coursePrice.value = c.coursePrice;
  courseDescription.value = c.courseDescription;
  courseCapacity.value = c.courseCapacity;
  update.style.display = 'inline';
  btnclick.style.display = 'none';

 }

 update.onclick = function(e)
 {
     e.preventDefault()
     updateCourseByButton ()
      read()
      btnclick.style.display = "inline"
      update.style.display ='none'
      clear()
 }

 function  updateCourseByButton ()
 {
  var course =
  {
      courseName : courseName.value,
      courseCategory : courseCategory.value ,
      coursePrice : coursePrice.value ,
      courseDescription : courseDescription.value ,
      courseCapacity : courseCapacity.value 

  }
  console.log(courses[currentIndex])

    courses[currentIndex].courseName = course.courseName
    courses[currentIndex].courseCategory =course.courseCategory
    courses[currentIndex].coursePrice = course.coursePrice
    courses[currentIndex].courseDescription = course.courseDescription
    courses[currentIndex].courseCapacity = course.courseCapacity
    localStorage.setItem('courses',JSON.stringify(courses))

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'course update succsesfully',
      showConfirmButton: false,
      timer: 1500
    })
 
   
 }

 var nameAlert =document.getElementById('nameAlaret');
 nameAlert.style.display ='none'

 courseName.onkeyup =function ()
 {
   var patreens =/^[A-Z][a-z]{2,20}$/
   if(patreens.test(courseName.value))
  {
    NameValid = true ;
    nameAlert.style.display ='none'
    if (courseName.classList.contains('is-invalid'))
    {
      courseName.classList.replace('is-invalid','is-valid')
    }
    courseName.classList.add('is-valid')
  }

  else
  {
    nameAlert.style.display='block'
    if (courseName.classList.contains('is-valid'))
    {
      courseName.classList.replace('is-valid','is-invalid')
    }
    courseName.classList.add('is-invalid')
  }

   checkInput ()
 }

 function checkInput ()
 {
    if (NameValid && CatValid && PriceValid && DescriptionValid && PriceValid)
    {
      btnclick.removeAttribute('disabled')
    }

   
 }

 var catAlert =document.getElementById('catAlaret');
 catAlert.style.display ='none'

 courseCategory.onkeyup =function ()
 {
   var patreens =/^[A-Z][a-z\s]{2,50}$/
   if(patreens.test(courseCategory.value))
  {
    CatValid = true ;
    catAlert.style.display ='none'
    if (courseCategory.classList.contains('is-invalid'))
    {
      courseCategory.classList.replace('is-invalid','is-valid')
    }
    courseCategory.classList.add('is-valid')
  }

  else
  {
    catAlert.style.display ='block'
    if (courseCategory.classList.contains('is-valid'))
    {
      courseCategory.classList.replace('is-valid','is-invalid')
    }
    courseCategory.classList.add('is-invalid')
  }

   checkInput ()
 }

 var priceAlaret =document.getElementById('priceAlaret');
 priceAlaret.style.display ='none'

 coursePrice.onkeyup =function ()
 {
   var patreens =/^[0-9]{3,4}$/
   if(patreens.test(coursePrice.value)&& coursePrice.value >= 100)
  {
    priceAlaret.style.display ='none'
    PriceValid = true ;
    if (coursePrice.classList.contains('is-invalid'))
    {
      coursePrice.classList.replace('is-invalid','is-valid')
    }
    coursePrice.classList.add('is-valid')
  }

  else
  {

    priceAlaret.style.display ='block'
    if (coursePrice.classList.contains('is-valid'))
    {
      coursePrice.classList.replace('is-valid','is-invalid')
    }
    coursePrice.classList.add('is-invalid')
  }

   checkInput ()
 }


var desAlaret =document.getElementById('desAlaret');
 desAlaret.style.display ='none'

 courseDescription.onkeyup =function ()
 {
   var patreens =/^[A-Z][A-Za-z0-9\s]{2,120}$/
   if(patreens.test(courseDescription.value))
  {
    desAlaret.style.display ='none'
    DescriptionValid = true ;
    if (courseDescription.classList.contains('is-invalid'))
    {
      courseDescription.classList.replace('is-invalid','is-valid')
    }
    courseDescription.classList.add('is-valid')
  }

  else
  {
    desAlaret.style.display ='block'
    if (courseDescription.classList.contains('is-valid'))
    {
      courseDescription.classList.replace('is-valid','is-invalid')
    }
    courseDescription.classList.add('is-invalid')
  }

   checkInput ()
 }

 var capacityAlaret =document.getElementById('capacityAlaret');
 capacityAlaret.style.display ='none'

 courseCapacity.onkeyup =function ()
 {
   var patreens =/^[0-9]{2,3}$/
   if(patreens.test(courseCapacity.value))
  {
    capacityAlaret.style.display ='none'
    CapacityValid = true ;
    if (courseCapacity.classList.contains('is-invalid'))
    {
      courseCapacity.classList.replace('is-invalid','is-valid')
    }
    courseCapacity.classList.add('is-valid')
  }

  else
  {
    capacityAlaret.style.display ='none'
    if (courseCapacity.classList.contains('is-valid'))
    {
      courseCapacity.classList.replace('is-valid','is-invalid')
    }
    courseCapacity.classList.add('is-invalid')
  }

   checkInput ()
 }