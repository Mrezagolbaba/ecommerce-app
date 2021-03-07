import {categoryConstant} from '../constant'

const initialState = {
    categories:[],
    loading: false,
    error:null,
};

const buildNewCategories =(parentId,categories,category)=>{
    let myCategories=[];
    categories.map((i)=>{
        if(i._id === parentId){
            myCategories.push({
                ...i,
                children:i.children&&i.children.length > 0? buildNewCategories(parentId,[...i.children,{
                    _id:category._id,
                    name:category.name,
                    slug: category.slug,
                    parentId:category.parentId,
                    children:category.children
                }],category) : []
            })
        }else {
            myCategories.push({
                ...i,
                children:i.children&&i.children.length > 0? buildNewCategories(parentId,i.children,category) : []
            })
        }
    });
    return myCategories;
}

const categoryReducer = (state= initialState, action) => {
    console.log(action)
    switch (action.type){
        case categoryConstant.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories:action.payload?.categories
            }
            break;
        case categoryConstant.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case categoryConstant.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updateCategories= buildNewCategories(category.parentId,state.categories,category)
            state = {
                ...state,
                categories:updateCategories,
                loading:false,
            };
            break;
        case categoryConstant.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initialState,

            }
            break;
    }
    return state
};

export default categoryReducer