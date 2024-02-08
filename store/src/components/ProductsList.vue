<template>
  <v-container>
    <v-data-iterator :items="products" :items-per-page="products.length">
      <template v-slot:header="{ }">
        <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
          <div class="text-truncate">
            {{ title }}
          </div>
        </h1>
      </template>

      <template v-slot:default="{ items }">
        <v-row>
          <v-col v-for="(item, i) in items" :key="i" cols="12" sm="6" xl="3">
            <v-sheet border>
              <v-img :gradient="`to top right, rgba(255, 255, 255, .1), rgba(${item.raw.color}, .15)`"
                :src="item.raw.thumbnail" cover height="150"></v-img>

              <v-list-item :title="item.raw.title" lines="two" density="comfortable" :subtitle="item.raw.description">
                <template v-slot:title>
                  <strong class="text-h6">
                    {{ item.raw.title }}
                  </strong>
                </template>
              </v-list-item>

              <v-table density="compact" class="text-caption">
                <tbody>
                  <tr align="right">
                    <th>ID</th>
                    <td>{{ item.raw.id }}</td>
                  </tr>

                  <tr align="right">
                    <th>Brand:</th>
                    <td>{{ item.raw.brand }}</td>
                  </tr>

                  <tr align="right">
                    <th>Rating:</th>
                    <td>
                      <v-rating :length="5" :size="32" :model-value="item.raw.rating" active-color="primary" readonly
                        half-increments />
                    </td>
                  </tr>

                  <tr>
                    <td colspan="2">
                      <v-carousel style="margin: 0 auto;" cycle height="400" hide-delimiter-background
                        show-arrows="hover">
                        <v-carousel-item v-for="(img, i) in item.raw.images" :key="i" :src="img" cover></v-carousel-item>
                      </v-carousel>
                    </td>
                  </tr>

                  <tr align="right">
                    <th>Category:</th>
                    <td>
                      <router-link :to="{ name: 'category', params: { category: item.raw.category } }">
                        <v-chip @click="() => { }">
                          {{ item.raw.category }}
                        </v-chip>
                      </router-link>
                    </td>
                  </tr>

                  <tr align="right">
                    <th>Stock:</th>
                    <td>{{ item.raw.stock }}</td>
                  </tr>

                  <tr align="right">
                    <th>Price:</th>
                    <td>
                      <s>${{ item.raw.price }}</s>
                      ${{ Math.round((item.raw.price - item.raw.price * item.raw.discountPercentage / 100) * 100) / 100 }}
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<style>
.v-table__wrapper {
  overflow-x: hidden;
}
</style>

<script>
export default {
  props: ["title", "products"]
}
</script>
