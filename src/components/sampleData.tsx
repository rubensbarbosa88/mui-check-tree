export interface RenderTree {
    id: string;
    name: string;
    children?: RenderTree[];
  }
  
export const data: RenderTree[] = [
    {
      "id": "1",
      "name": "Parent 1",
      "children": [
        {
          "id": "2",
          "name": "Child 1",
          "children": [
            {
              "id": "5",
              "name": "Grandchild 1",
              "children": [
                {
                  "id": "9",
                  "name": "Great-grandchild 1",
                },
                {
                  "id": "10",
                  "name": "Great-grandchild 2",
                }
              ]
            },
            {
              "id": "6",
              "name": "Grandchild 2",
              "children": [
                {
                  "id": "11",
                  "name": "Great-grandchild 3",
                },
                {
                  "id": "12",
                  "name": "Great-grandchild 4",
                }
              ]
            }
          ]
        },
        {
          "id": "3",
          "name": "Child 2",
          "children": [
            {
              "id": "7",
              "name": "Grandchild 3",
            }
          ]
        }
      ]
    },
    {
      "id": "4",
      "name": "Parent 2",
      "children": [
        {
          "id": "8",
          "name": "Child 3",
          "children": [
            {
              "id": "13",
              "name": "Grandchild 4",
              "children": [
                {
                  "id": "14",
                  "name": "Great-grandchild 5",
                },
                {
                  "id": "15",
                  "name": "Great-grandchild 6",
                }
              ]
            },
            {
              "id": "16",
              "name": "Grandchild 5",
              "children": [
                {
                  "id": "17",
                  "name": "Great-grandchild 7"
                },
                {
                  "id": "18",
                  "name": "Great-grandchild 8"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "19",
      "name": "Parent 3",
      "children": [
        {
          "id": "20",
          "name": "Child 4",
          "children": [
            {
              "id": "21",
              "name": "Grandchild 6",
              "children": [
                {
                  "id": "22",
                  "name": "Great-grandchild 9"
                },
                {
                  "id": "23",
                  "name": "Great-grandchild 10"
                }
              ]
            },
            {
              "id": "24",
              "name": "Grandchild 7"
            }
          ]
        }
      ]
    }
  ]
  
  